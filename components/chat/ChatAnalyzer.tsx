"use client"

import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react"
import { v4 as uuidv4 } from "uuid"
import { Citation } from "@/types/rag"
import { Sidebar } from "@/components/ui/Sidebar"
import {
  ChatMessage,
  FileDisplay,
  TypingIndicator,
} from "@/components/ui/ChatMessage"
import { useToast } from "@/components/ui/Toast"

type SpeechRecognitionInstance = {
  continuous: boolean
  interimResults: boolean
  lang: string
  onstart: (() => void) | null
  onresult: ((event: any) => void) | null
  onerror: ((event: { error: string }) => void) | null
  onend: (() => void) | null
  start: () => void
  stop: () => void
  abort: () => void
}

type SpeechRecognitionConstructor = new () => SpeechRecognitionInstance

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor
    webkitSpeechRecognition?: SpeechRecognitionConstructor
  }
}

type AnalysisChatMessage = {
  id: string
  sender: "user" | "assistant"
  text: string
  citations?: Citation[]
}

type TranscriptSession = {
  id: string
  title: string
  transcript: string
  fileName: string
  transcriptId: string
  chunkCount: number | null
  analysisMessages: AnalysisChatMessage[]
  createdAt: number
  updatedAt: number
}

interface ChatAnalyzerProps {
  sidebarOpen: boolean
  onSidebarClose: () => void
}

const LOCAL_USER_ID = "local-preview-user"
const ANALYZER_STORAGE_KEY = "chatlytics.analyzer.v1"

function newTranscriptSession(): TranscriptSession {
  const now = Date.now()
  return {
    id: uuidv4(),
    title: "New Chat",
    transcript: "",
    fileName: "",
    transcriptId: "",
    chunkCount: null,
    analysisMessages: [],
    createdAt: now,
    updatedAt: now,
  }
}

function getSessionTitle(fileName: string, transcript: string): string {
  if (fileName) return fileName.replace(/\.[^.]+$/, "")
  const firstLine = transcript.split("\n").find((l) => l.trim())?.trim() || ""
  return firstLine.slice(0, 50) || "New Chat"
}

export function ChatAnalyzer({
  sidebarOpen,
  onSidebarClose,
}: ChatAnalyzerProps) {
  const [sessions, setSessions] = useState<TranscriptSession[]>([])
  const [currentSessionId, setCurrentSessionId] = useState("")
  const [transcript, setTranscript] = useState("")
  const [fileName, setFileName] = useState("")
  const [question, setQuestion] = useState("")
  const [isIngesting, setIsIngesting] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [speechSupported, setSpeechSupported] = useState(false)
  const [isSpeechProcessing, setIsSpeechProcessing] = useState(false)

  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)
  const { showToast } = useToast()

  const currentSession = sessions.find((session) => session.id === currentSessionId)
  const messages = currentSession?.analysisMessages || []
  const transcriptId = currentSession?.transcriptId || ""

  const canIngest = transcript.trim().length > 0 && !isIngesting
  const canAnalyze =
    transcriptId.length > 0 && question.trim().length > 0 && !isAnalyzing

  useEffect(() => {
    const stored = localStorage.getItem(ANALYZER_STORAGE_KEY)

    if (stored) {
      try {
        const data = JSON.parse(stored)
        const restoredSessions = Array.isArray(data.sessions) ? data.sessions : []
        const restoredCurrentSessionId =
          typeof data.currentSessionId === "string" ? data.currentSessionId : ""

        if (restoredSessions.length > 0) {
          const activeSession =
            restoredSessions.find(
              (session) => session.id === restoredCurrentSessionId
            ) || restoredSessions[0]
          setSessions(restoredSessions)
          setCurrentSessionId(activeSession.id)
          setTranscript(activeSession.transcript)
          setFileName(activeSession.fileName)
        } else {
          const session = newTranscriptSession()
          setSessions([session])
          setCurrentSessionId(session.id)
        }
      } catch (err) {
        console.error("Failed to restore sessions:", err)
        const session = newTranscriptSession()
        setSessions([session])
        setCurrentSessionId(session.id)
      }
    } else {
      const session = newTranscriptSession()
      setSessions([session])
      setCurrentSessionId(session.id)
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition
    setSpeechSupported(!!SpeechRecognition)
  }, [])

  useEffect(() => {
    if (sessions.length > 0 || currentSessionId) {
      localStorage.setItem(
        ANALYZER_STORAGE_KEY,
        JSON.stringify({ sessions, currentSessionId })
      )
    }
  }, [sessions, currentSessionId])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  function newChat() {
    const session = newTranscriptSession()
    setSessions((prev) => [session, ...prev])
    setCurrentSessionId(session.id)
    setTranscript("")
    setFileName("")
    setQuestion("")
  }

  function selectSession(id: string) {
    const session = sessions.find((item) => item.id === id)
    if (!session) return

    setCurrentSessionId(id)
    setTranscript(session.transcript)
    setFileName(session.fileName)
    setQuestion("")
  }

  function updateCurrentSession(updates: Partial<TranscriptSession>) {
    setSessions((prev) =>
      prev.map((session) =>
        session.id === currentSessionId
          ? { ...session, ...updates, updatedAt: Date.now() }
          : session
      )
    )
  }

  function updateCurrentSessionMessages(
    updater: (messages: AnalysisChatMessage[]) => AnalysisChatMessage[]
  ) {
    setSessions((prev) =>
      prev.map((session) =>
        session.id === currentSessionId
          ? {
              ...session,
              analysisMessages: updater(session.analysisMessages),
              updatedAt: Date.now(),
            }
          : session
      )
    )
  }

  async function handleFileUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.currentTarget.files?.[0]
    if (!file) return

    try {
      const text = await file.text()
      setFileName(file.name)
      setTranscript(text)
      updateCurrentSession({
        fileName: file.name,
        transcript: text,
        transcriptId: "",
        chunkCount: null,
        analysisMessages: [],
      })
      showToast(`File "${file.name}" loaded`, "success")
    } catch {
      showToast("Failed to read file", "error")
    }
  }

  async function ingestTranscript() {
    if (!canIngest) return

    setIsIngesting(true)

    try {
      const response = await fetch("/api/ingest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          transcript,
          userId: LOCAL_USER_ID,
          fileName: fileName || "pasted_transcript",
        }),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to ingest")
      }

      const newMessages: AnalysisChatMessage[] = [
        {
          id: uuidv4(),
          sender: "assistant",
          text: `Transcript ingested. Found ${data.chunkCount} conversation chunks. Ask a question below.`,
        },
      ]

      updateCurrentSession({
        title: getSessionTitle(fileName, transcript),
        transcript,
        fileName,
        transcriptId: data.transcriptId,
        chunkCount: data.chunkCount,
        analysisMessages: newMessages,
      })

      showToast("Transcript ingested successfully", "success")
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Ingest failed", "error")
    } finally {
      setIsIngesting(false)
    }
  }

  async function askQuestion(e: FormEvent) {
    e.preventDefault()
    if (!canAnalyze) return

    const userMessage: AnalysisChatMessage = {
      id: uuidv4(),
      sender: "user",
      text: question,
    }

    setQuestion("")
    setIsAnalyzing(true)

    try {
      updateCurrentSessionMessages((currentMessages) => [
        ...currentMessages,
        userMessage,
      ])

      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: userMessage.text,
          transcriptId,
          userId: LOCAL_USER_ID,
        }),
      })

      const data = await response.json()

      if (!response.ok || data.error) {
        throw new Error(data.error || "Failed to analyze")
      }

      const assistantMessage: AnalysisChatMessage = {
        id: uuidv4(),
        sender: "assistant",
        text: data.answer || "No answer generated",
        citations: Array.isArray(data.citations) ? data.citations : [],
      }

      updateCurrentSessionMessages((currentMessages) => [
        ...currentMessages,
        assistantMessage,
      ])
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Analysis failed", "error")
      updateCurrentSessionMessages((currentMessages) =>
        currentMessages.filter((message) => message.id !== userMessage.id)
      )
    } finally {
      setIsAnalyzing(false)
    }
  }

  function startListening() {
    if (!speechSupported) {
      showToast("Speech recognition not supported", "error")
      return
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) return

    recognitionRef.current = new SpeechRecognition()
    recognitionRef.current.continuous = false
    recognitionRef.current.interimResults = false

    recognitionRef.current.onstart = () => {
      setIsListening(true)
      setIsSpeechProcessing(true)
    }

    recognitionRef.current.onresult = (event: any) => {
      const spokenQuestion = Array.from(event.results)
        .map((result: any) => result[0].transcript)
        .join("")
      setQuestion(spokenQuestion)
      setIsSpeechProcessing(false)
    }

    recognitionRef.current.onerror = (event: any) => {
      showToast(`Speech error: ${event.error}`, "error")
      setIsListening(false)
      setIsSpeechProcessing(false)
    }

    recognitionRef.current.onend = () => {
      setIsListening(false)
    }

    recognitionRef.current.start()
  }

  function stopListening() {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }

  return (
    <div className="flex h-screen bg-white">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={onSidebarClose}
        sessions={sessions.map((session) => ({
          id: session.id,
          title: session.title,
          timestamp: session.updatedAt,
        }))}
        currentSessionId={currentSessionId}
        onSelectSession={selectSession}
        onNewChat={newChat}
      />

      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
          {!currentSession || !transcriptId ? (
            <div className="h-full flex flex-col items-center justify-center space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  Upload a Chat Transcript
                </h2>
                <p className="text-gray-600">
                  Analyze conversations with AI-powered insights
                </p>
              </div>

              <div className="w-full max-w-md space-y-4">
                <label className="block">
                  <input
                    type="file"
                    accept=".txt,.pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-primary hover:bg-gray-50 transition-colors">
                    <div className="text-3xl mb-2">File</div>
                    <p className="font-medium text-gray-900">
                      Click to upload or drag file
                    </p>
                    <p className="text-sm text-gray-500">TXT, PDF</p>
                  </div>
                </label>

                <div className="relative">
                  <textarea
                    placeholder="Or paste your chat transcript here..."
                    value={transcript}
                    onChange={(e) => {
                      setTranscript(e.target.value)
                      updateCurrentSession({
                        transcript: e.target.value,
                        fileName,
                        transcriptId: "",
                        chunkCount: null,
                        analysisMessages: [],
                      })
                    }}
                    className="textarea-field h-32"
                  />
                </div>

                {fileName && (
                  <FileDisplay
                    fileName={fileName}
                    size={`${(transcript.length / 1024).toFixed(1)} KB`}
                  />
                )}

                <button
                  onClick={ingestTranscript}
                  disabled={!canIngest}
                  className="btn-primary w-full"
                >
                  {isIngesting ? "Ingesting..." : "Ingest Transcript"}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm font-medium text-blue-900">
                  {currentSession.title} • {currentSession.chunkCount} chunks analyzed
                </p>
              </div>

              {messages.map((msg) => (
                <ChatMessage
                  key={msg.id}
                  sender={msg.sender}
                  text={msg.text}
                  citations={msg.citations}
                />
              ))}

              {isAnalyzing && (
                <div className="flex gap-2 text-gray-600">
                  <span>Assistant is thinking</span>
                  <TypingIndicator />
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {transcriptId && (
          <div className="border-t border-gray-200 bg-white p-4 md:p-6">
            <form onSubmit={askQuestion} className="max-w-4xl mx-auto space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ask about the conversation..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  disabled={isAnalyzing}
                  className="input-field flex-1 disabled:bg-gray-50"
                />

                {speechSupported && (
                  <button
                    type="button"
                    onClick={isListening ? stopListening : startListening}
                    disabled={isAnalyzing || isSpeechProcessing}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      isListening
                        ? "bg-red-500 text-white"
                        : "bg-gray-200 hover:bg-gray-300 text-gray-900"
                    } disabled:opacity-50`}
                    title="Speech recognition"
                  >
                    {isListening ? "Stop" : "Speak"}
                  </button>
                )}

                <button
                  type="submit"
                  disabled={!canAnalyze}
                  className="btn-primary disabled:opacity-50"
                >
                  {isAnalyzing ? "..." : "Send"}
                </button>
              </div>

              {isListening && (
                <p className="text-sm text-red-600">Listening...</p>
              )}
            </form>
          </div>
        )}
      </main>
    </div>
  )
}
