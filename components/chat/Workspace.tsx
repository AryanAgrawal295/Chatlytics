"use client"

import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { BotBuilder } from "./BotBuilder"

type SpeechResultEvent = {
  resultIndex: number
  results: {
    length: number
    [index: number]: {
      0: { transcript: string }
    }
  }
}

type SpeechRecognitionInstance = {
  continuous: boolean
  interimResults: boolean
  lang: string
  onstart: (() => void) | null
  onresult: ((event: SpeechResultEvent) => void) | null
  onerror: ((event: { error: string }) => void) | null
  onend: (() => void) | null
  start: () => void
  stop: () => void
  abort: () => void
}

type SpeechRecognitionConstructor = new () => SpeechRecognitionInstance

type Tab = "analysis" | "builder"

type IngestResponse = {
  success: boolean
  transcriptId: string
  chunkCount: number
  emotionsDetected?: string[]
  intentsDetected?: string[]
  error?: string
}

type AnalyzeResponse = {
  answer?: string
  chunksUsed?: number
  error?: string
}

type AnalysisChatMessage = {
  id: string
  sender: "user" | "assistant"
  text: string
}

type TranscriptSession = {
  id: string
  title: string
  transcript: string
  fileName: string
  question: string
  transcriptId: string
  chunkCount: number | null
  analysisMessages: AnalysisChatMessage[]
  createdAt: number
  updatedAt: number
}

type PersistedWorkspaceState = {
  activeTab: Tab
  currentSessionId: string
  sessions: TranscriptSession[]
}

const LOCAL_USER_ID = "local-preview-user"
const WORKSPACE_STORAGE_KEY = "chatlytics.workspace.v2"
const LEGACY_WORKSPACE_STORAGE_KEY = "chatlytics.workspace.v1"

function transcriptTitle(fileName: string, transcript: string): string {
  if (fileName) return fileName.replace(/\.txt$/i, "")
  const firstLine = transcript.split("\n").find((line) => line.trim())?.trim()
  return firstLine ? firstLine.slice(0, 42) : "New transcript"
}

function newTranscriptSession(): TranscriptSession {
  const now = Date.now()
  return {
    id: crypto.randomUUID(),
    title: "New transcript",
    transcript: "",
    fileName: "",
    question: "",
    transcriptId: "",
    chunkCount: null,
    analysisMessages: [],
    createdAt: now,
    updatedAt: now,
  }
}

export function Workspace() {
  const [activeTab, setActiveTab] = useState<Tab>("analysis")
  const [transcript, setTranscript] = useState("")
  const [fileName, setFileName] = useState("")
  const [question, setQuestion] = useState("")
  const [analysisMessages, setAnalysisMessages] = useState<AnalysisChatMessage[]>([])
  const [transcriptId, setTranscriptId] = useState("")
  const [chunkCount, setChunkCount] = useState<number | null>(null)
  const [status, setStatus] = useState("")
  const [error, setError] = useState("")
  const [isIngesting, setIsIngesting] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [speechSupported, setSpeechSupported] = useState(false)
  const [isWorkspaceRestored, setIsWorkspaceRestored] = useState(false)
  const [isTranscriptHistoryOpen, setIsTranscriptHistoryOpen] = useState(false)
  const [sessions, setSessions] = useState<TranscriptSession[]>([])
  const [currentSessionId, setCurrentSessionId] = useState("")
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null)
  const analysisThreadRef = useRef<HTMLDivElement | null>(null)

  const canIngest = transcript.trim().length > 0 && !isIngesting
  const canAnalyze =
    transcriptId.trim().length > 0 && question.trim().length > 0 && !isAnalyzing

  const transcriptStats = useMemo(() => {
    const lines = transcript.split("\n").filter((line) => line.trim()).length
    const words = transcript.trim() ? transcript.trim().split(/\s+/).length : 0
    return { lines, words }
  }, [transcript])

  function applySession(session: TranscriptSession) {
    recognitionRef.current?.abort()
    setTranscript(session.transcript)
    setFileName(session.fileName)
    setQuestion(session.question)
    setTranscriptId(session.transcriptId)
    setChunkCount(session.chunkCount)
    setAnalysisMessages(session.analysisMessages)
    setError("")
    setStatus("")
    setIsListening(false)
  }

  function snapshotSession(session: TranscriptSession): TranscriptSession {
    return {
      ...session,
      title: transcriptTitle(fileName, transcript),
      transcript,
      fileName,
      question,
      transcriptId,
      chunkCount,
      analysisMessages,
      updatedAt: Date.now(),
    }
  }

  function openSession(sessionId: string) {
    const target = sessions.find((session) => session.id === sessionId)
    if (!target) return

    setSessions((current) =>
      current.map((session) =>
        session.id === currentSessionId ? snapshotSession(session) : session
      )
    )
    setCurrentSessionId(target.id)
    applySession(target)
    setIsTranscriptHistoryOpen(false)
  }

  function createNewTranscript() {
    const nextSession = newTranscriptSession()
    setSessions((current) => [
      ...current.map((session) =>
        session.id === currentSessionId ? snapshotSession(session) : session
      ),
      nextSession,
    ])
    setCurrentSessionId(nextSession.id)
    applySession(nextSession)
    setActiveTab("analysis")
    setIsTranscriptHistoryOpen(false)
  }

  useEffect(() => {
    setSpeechSupported(
      Boolean(window.SpeechRecognition || window.webkitSpeechRecognition)
    )

    return () => recognitionRef.current?.abort()
  }, [])

  useEffect(() => {
    try {
      const saved = localStorage.getItem(WORKSPACE_STORAGE_KEY)
      if (saved) {
        const state = JSON.parse(saved) as Partial<PersistedWorkspaceState>
        if (state.activeTab === "analysis" || state.activeTab === "builder") {
          setActiveTab(state.activeTab)
        }
        if (Array.isArray(state.sessions) && state.sessions.length > 0) {
          const restoredSessions = state.sessions
          const current =
            restoredSessions.find(
              (session) => session.id === state.currentSessionId
            ) || restoredSessions[0]
          setSessions(restoredSessions)
          setCurrentSessionId(current.id)
          applySession(current)
          setIsWorkspaceRestored(true)
          return
        }
      }

      const legacySaved = localStorage.getItem(LEGACY_WORKSPACE_STORAGE_KEY)
      if (legacySaved) {
        const legacy = JSON.parse(legacySaved) as Partial<TranscriptSession> & {
          activeTab?: Tab
        }
        const migrated = newTranscriptSession()
        migrated.transcript =
          typeof legacy.transcript === "string" ? legacy.transcript : ""
        migrated.fileName =
          typeof legacy.fileName === "string" ? legacy.fileName : ""
        migrated.question =
          typeof legacy.question === "string" ? legacy.question : ""
        migrated.transcriptId =
          typeof legacy.transcriptId === "string" ? legacy.transcriptId : ""
        migrated.chunkCount =
          typeof legacy.chunkCount === "number" ? legacy.chunkCount : null
        migrated.analysisMessages = Array.isArray(legacy.analysisMessages)
          ? legacy.analysisMessages
          : []
        migrated.title = transcriptTitle(
          migrated.fileName,
          migrated.transcript
        )
        setSessions([migrated])
        setCurrentSessionId(migrated.id)
        applySession(migrated)
        if (legacy.activeTab === "analysis" || legacy.activeTab === "builder") {
          setActiveTab(legacy.activeTab)
        }
      } else {
        const initial = newTranscriptSession()
        setSessions([initial])
        setCurrentSessionId(initial.id)
        applySession(initial)
      }
    } catch {
      localStorage.removeItem(WORKSPACE_STORAGE_KEY)
      const initial = newTranscriptSession()
      setSessions([initial])
      setCurrentSessionId(initial.id)
      applySession(initial)
    } finally {
      setIsWorkspaceRestored(true)
    }
  }, [])

  useEffect(() => {
    if (!isWorkspaceRestored || !currentSessionId) return

    setSessions((current) =>
      current.map((session) =>
        session.id === currentSessionId ? snapshotSession(session) : session
      )
    )
  }, [
    analysisMessages,
    chunkCount,
    currentSessionId,
    fileName,
    isWorkspaceRestored,
    question,
    transcript,
    transcriptId,
  ])

  useEffect(() => {
    if (!isWorkspaceRestored || !currentSessionId) return

    const state: PersistedWorkspaceState = {
      activeTab,
      currentSessionId,
      sessions,
    }

    try {
      localStorage.setItem(WORKSPACE_STORAGE_KEY, JSON.stringify(state))
    } catch {
      // Storage can be unavailable in private browsing or when a transcript is too large.
    }
  }, [
    activeTab,
    currentSessionId,
    isWorkspaceRestored,
    sessions,
  ])

  useEffect(() => {
    const thread = analysisThreadRef.current
    if (thread) thread.scrollTop = thread.scrollHeight
  }, [analysisMessages, isAnalyzing])

  function toggleSpeechInput() {
    if (isListening) {
      recognitionRef.current?.stop()
      return
    }

    const Recognition =
      window.SpeechRecognition || window.webkitSpeechRecognition
    if (!Recognition) {
      setError("Speech input is not supported by this browser.")
      return
    }

    const recognition = new Recognition()
    const existingQuestion = question.trim()
    recognition.continuous = false
    recognition.interimResults = true
    recognition.lang = navigator.language || "en-IN"
    recognition.onstart = () => {
      setError("")
      setStatus("Listening...")
      setIsListening(true)
    }
    recognition.onresult = (event) => {
      let spokenText = ""
      for (let i = 0; i < event.results.length; i++) {
        spokenText += event.results[i][0].transcript
      }
      const combined = [existingQuestion, spokenText.trim()]
        .filter(Boolean)
        .join(existingQuestion ? " " : "")
      setQuestion(combined)
    }
    recognition.onerror = (event) => {
      const message =
        event.error === "not-allowed"
          ? "Microphone permission was denied. Allow microphone access and try again."
          : event.error === "no-speech"
            ? "No speech was detected. Please try again."
            : "Speech input failed. Please try again."
      setError(message)
      setStatus("")
      setIsListening(false)
    }
    recognition.onend = () => {
      recognitionRef.current = null
      setIsListening(false)
      setStatus("")
    }

    recognitionRef.current = recognition
    recognition.start()
  }

  async function handleFileUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return

    setError("")
    setFileName(file.name)
    setTranscript(await file.text())
    setTranscriptId("")
    setAnalysisMessages([])
    setChunkCount(null)
    setStatus("Transcript loaded. Ingest it before asking questions.")
  }

  async function ingestTranscript() {
    if (!canIngest) return

    setIsIngesting(true)
    setError("")
    setStatus("Ingesting transcript...")

    try {
      const response = await fetch("/api/ingest", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          transcript,
          userId: LOCAL_USER_ID,
          fileName: fileName || "pasted_transcript",
        }),
      })

      const data = (await response.json()) as IngestResponse
      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to ingest transcript")
      }

      setTranscriptId(data.transcriptId)
      setChunkCount(data.chunkCount)
      setStatus(`Ready. ${data.chunkCount} chunks stored for analysis.`)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to ingest transcript")
      setStatus("")
    } finally {
      setIsIngesting(false)
    }
  }

  async function askQuestion(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!canAnalyze) return

    const submittedQuestion = question.trim()
    const userMessage: AnalysisChatMessage = {
      id: crypto.randomUUID(),
      sender: "user",
      text: submittedQuestion,
    }

    setIsAnalyzing(true)
    setError("")
    setAnalysisMessages((current) => [...current, userMessage])
    setQuestion("")
    setStatus("Finding relevant conversation context...")

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          question: submittedQuestion,
          transcriptId,
          userId: LOCAL_USER_ID,
        }),
      })

      const data = (await response.json()) as AnalyzeResponse
      if (!response.ok || data.error) {
        throw new Error(data.error || "Failed to analyze transcript")
      }

      setAnalysisMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          sender: "assistant",
          text: data.answer || "No answer returned.",
        },
      ])
      setStatus(
        typeof data.chunksUsed === "number"
          ? `Answer grounded in ${data.chunksUsed} retrieved chunks.`
          : "Answer generated."
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to analyze transcript")
      setStatus("")
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <main className="workspace-shell">
      {isTranscriptHistoryOpen ? (
        <>
          <button
            className="transcript-drawer-backdrop"
            type="button"
            aria-label="Close transcript history"
            onClick={() => setIsTranscriptHistoryOpen(false)}
          />
          <aside
            className="transcript-drawer"
            aria-label="Previous transcripts"
          >
            <div className="transcript-drawer-header">
              <div>
                <p className="eyebrow">Chatlytics</p>
                <h2>Transcripts</h2>
              </div>
              <button
                className="text-button"
                type="button"
                onClick={() => setIsTranscriptHistoryOpen(false)}
              >
                Close
              </button>
            </div>

            <button
              className="primary-button new-transcript-button"
              type="button"
              disabled={isIngesting || isAnalyzing}
              onClick={createNewTranscript}
            >
              New transcript
            </button>

            <div className="transcript-session-list">
              {[...sessions]
                .sort((a, b) => b.updatedAt - a.updatedAt)
                .map((session) => (
                  <button
                    className={
                      session.id === currentSessionId
                        ? "transcript-session active"
                        : "transcript-session"
                    }
                    type="button"
                    key={session.id}
                    disabled={isIngesting || isAnalyzing}
                    onClick={() => openSession(session.id)}
                  >
                    <strong>{session.title}</strong>
                    <span>
                      {session.analysisMessages.filter(
                        (message) => message.sender === "user"
                      ).length} queries
                    </span>
                    <small>
                      {new Date(session.updatedAt).toLocaleDateString()}
                    </small>
                  </button>
                ))}
            </div>
          </aside>
        </>
      ) : null}

      <section className="workspace-header">
        <div>
          <p className="eyebrow">Chatlytics</p>
          <h1>Conversation Intelligence Workspace</h1>
        </div>
        <div className="tab-list" aria-label="Workspace views">
          <button
            className={activeTab === "analysis" ? "tab active" : "tab"}
            type="button"
            onClick={() => setActiveTab("analysis")}
          >
            Chat Analysis
          </button>
          <button
            className={activeTab === "builder" ? "tab active" : "tab"}
            type="button"
            onClick={() => setActiveTab("builder")}
          >
            Bot Builder
          </button>
        </div>
      </section>

      {activeTab === "analysis" ? (
        <div className="analysis-workspace">
          <button
            className="transcript-history-button"
            type="button"
            onClick={() => setIsTranscriptHistoryOpen(true)}
          >
            Transcripts
            <span>{sessions.length}</span>
          </button>
          <section className="analysis-grid">
          <div className="panel">
            <div className="panel-heading">
              <div>
                <h2>Transcript</h2>
                <p>{transcriptStats.lines} lines / {transcriptStats.words} words</p>
              </div>
              <label className="file-button">
                Upload .txt
                <input accept=".txt,text/plain" type="file" onChange={handleFileUpload} />
              </label>
            </div>

            <textarea
              className="transcript-input"
              placeholder="Paste a customer-agent chat transcript here..."
              value={transcript}
              onChange={(event) => {
                setTranscript(event.target.value)
                setTranscriptId("")
                setAnalysisMessages([])
                setChunkCount(null)
              }}
            />

            <div className="action-row">
              <button
                className="primary-button"
                type="button"
                disabled={!canIngest}
                onClick={ingestTranscript}
              >
                {isIngesting ? "Ingesting..." : "Ingest Transcript"}
              </button>
              {chunkCount !== null ? (
                <span className="inline-status">{chunkCount} chunks indexed</span>
              ) : null}
            </div>
          </div>

          <div className="panel analysis-chat-panel">
            <div className="panel-heading analysis-chat-heading">
              <div>
                <h2>Ask</h2>
                <p>{transcriptId ? "Transcript is ready" : "Ingest transcript first"}</p>
              </div>
              {analysisMessages.length > 0 ? (
                <button
                  className="text-button"
                  type="button"
                  onClick={() => {
                    setAnalysisMessages([])
                    setQuestion("")
                    setError("")
                    setStatus("")
                  }}
                >
                  Clear chat
                </button>
              ) : null}
            </div>

            <div
              className="analysis-thread"
              aria-live="polite"
              ref={analysisThreadRef}
            >
              {analysisMessages.length === 0 ? (
                <div className="analysis-empty-state">
                  <strong>Ask about this transcript</strong>
                  <p>Your questions and grounded answers will remain here.</p>
                </div>
              ) : (
                analysisMessages.map((message) => (
                  <div
                    className={
                      message.sender === "user"
                        ? "analysis-message analysis-question"
                        : "analysis-message analysis-answer"
                    }
                    key={message.id}
                  >
                    <span>{message.sender === "user" ? "You" : "Chatlytics"}</span>
                    <p>{message.text}</p>
                  </div>
                ))
              )}
              {isAnalyzing ? (
                <div className="analysis-thinking">Analyzing transcript...</div>
              ) : null}
            </div>

            <form className="question-form analysis-composer" onSubmit={askQuestion}>
              <textarea
                className="question-input"
                placeholder="Ask a question about this transcript..."
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault()
                    event.currentTarget.form?.requestSubmit()
                  }
                }}
              />
              <div className="query-action-row">
                <button className="primary-button" type="submit" disabled={!canAnalyze}>
                  {isAnalyzing ? "Analyzing..." : "Ask Question"}
                </button>
                <button
                  className={isListening ? "speech-button listening" : "speech-button"}
                  type="button"
                  disabled={!speechSupported || isAnalyzing}
                  onClick={toggleSpeechInput}
                  title={
                    speechSupported
                      ? "Speak your question"
                      : "Speech input is not supported by this browser"
                  }
                >
                  {isListening ? "Stop listening" : "Speak query"}
                </button>
              </div>
            </form>
          </div>
          </section>
        </div>
      ) : (
        <BotBuilder />
      )}

      {(status || error) && (
        <div className={error ? "toast error" : "toast"}>
          {error || status}
        </div>
      )}
    </main>
  )
}
