"use client"

import {
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react"
import { v4 as uuidv4 } from "uuid"
import { BotChatMessage, BotRole, StyleProfile } from "@/types/bot"
import { Sidebar } from "@/components/ui/Sidebar"
import { ChatMessage, TypingIndicator } from "@/components/ui/ChatMessage"
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

interface StyleSourceFile {
  id: string
  name: string
  content: string
}

interface BotSession {
  id: string
  title: string
  userName: string
  role: BotRole
  profile: StyleProfile | null
  messages: BotChatMessage[]
  styleFiles: StyleSourceFile[]
  oldChats: string
  createdAt: number
  updatedAt: number
}

interface BotBuilderProps {
  sidebarOpen: boolean
  onSidebarClose: () => void
}

const ROLE_OPTIONS: Array<{ value: BotRole; label: string; detail: string }> = [
  { value: "friend", label: "Friend", detail: "Warm, honest, relaxed" },
  { value: "relative", label: "Relative", detail: "Familiar and caring" },
  { value: "employee", label: "Employee", detail: "Respectful and clear" },
  { value: "manager", label: "Manager", detail: "Calm and decisive" },
  { value: "partner", label: "Love partner", detail: "Affectionate and attentive" },
  { value: "casual", label: "Casual", detail: "Natural and low-pressure" },
]

const BOT_BUILDER_STORAGE_KEY = "chatlytics.botBuilder.v2"

function newBotSession(): BotSession {
  const now = Date.now()
  return {
    id: uuidv4(),
    title: "New Bot",
    userName: "",
    role: "friend",
    profile: null,
    messages: [],
    styleFiles: [],
    oldChats: "",
    createdAt: now,
    updatedAt: now,
  }
}

export function BotBuilder({
  sidebarOpen,
  onSidebarClose,
}: BotBuilderProps) {
  const [sessions, setSessions] = useState<BotSession[]>([])
  const [currentSessionId, setCurrentSessionId] = useState("")
  const [step, setStep] = useState<"setup" | "chat">("setup")
  const [isLearning, setIsLearning] = useState(false)
  const [isReplying, setIsReplying] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isSpeechProcessing, setIsSpeechProcessing] = useState(false)
  const [speechSupported, setSpeechSupported] = useState(false)
  const [incomingMessage, setIncomingMessage] = useState("")

  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)
  const { showToast } = useToast()

  const currentSession = sessions.find((session) => session.id === currentSessionId)
  const {
    userName = "",
    role = "friend",
    profile = null,
    messages = [],
    styleFiles = [],
    oldChats = "",
  } = currentSession || {}

  useEffect(() => {
    const stored = localStorage.getItem(BOT_BUILDER_STORAGE_KEY)

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
          setStep(activeSession.profile ? "chat" : "setup")
        } else {
          const session = newBotSession()
          setSessions([session])
          setCurrentSessionId(session.id)
        }
      } catch (err) {
        console.error("Failed to restore bot sessions:", err)
        const session = newBotSession()
        setSessions([session])
        setCurrentSessionId(session.id)
      }
    } else {
      const session = newBotSession()
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
        BOT_BUILDER_STORAGE_KEY,
        JSON.stringify({ sessions, currentSessionId })
      )
    }
  }, [sessions, currentSessionId])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  function newSession() {
    const session = newBotSession()
    setSessions((prev) => [session, ...prev])
    setCurrentSessionId(session.id)
    setStep("setup")
    setIncomingMessage("")
  }

  function selectSession(id: string) {
    setCurrentSessionId(id)
    const session = sessions.find((item) => item.id === id)
    setStep(session?.profile ? "chat" : "setup")
    setIncomingMessage("")
  }

  function updateSession(updates: Partial<BotSession>) {
    setSessions((prev) =>
      prev.map((session) =>
        session.id === currentSessionId
          ? { ...session, ...updates, updatedAt: Date.now() }
          : session
      )
    )
  }

  function updateSessionMessages(
    updater: (messages: BotChatMessage[]) => BotChatMessage[]
  ) {
    setSessions((prev) =>
      prev.map((session) =>
        session.id === currentSessionId
          ? {
              ...session,
              messages: updater(session.messages),
              updatedAt: Date.now(),
            }
          : session
      )
    )
  }

  async function learnStyle() {
    if ((!oldChats.trim() && styleFiles.length === 0) || !userName.trim()) {
      showToast("Enter name and provide chat samples", "error")
      return
    }

    setIsLearning(true)

    try {
      const transcriptSource = [oldChats, ...styleFiles.map((file) => file.content)]
        .filter((value) => value.trim())
        .join("\n")

      const response = await fetch("/api/bot/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName,
          transcript: transcriptSource,
        }),
      })

      const data = await response.json()

      if (!response.ok || !data.profile) {
        throw new Error(data.error || "Failed to learn style")
      }

      updateSession({
        profile: data.profile,
        title: `${userName} (${role})`,
      })

      setStep("chat")
      showToast("Style profile created", "success")
    } catch (err) {
      showToast(
        err instanceof Error ? err.message : "Failed to learn style",
        "error"
      )
    } finally {
      setIsLearning(false)
    }
  }

  async function sendMessage(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!incomingMessage.trim() || !profile || isReplying) return

    const userMessage: BotChatMessage = {
      id: uuidv4(),
      sender: "user",
      text: incomingMessage,
    }

    setIncomingMessage("")
    setIsReplying(true)

    try {
      updateSessionMessages((currentMessages) => [
        ...currentMessages,
        userMessage,
      ])

      const response = await fetch("/api/bot/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role,
          profile,
          conversation: messages,
          message: userMessage.text,
        }),
      })

      const data = await response.json()

      if (!response.ok || !data.reply) {
        throw new Error(data.error || "Failed to generate reply")
      }

      const botMessage: BotChatMessage = {
        id: uuidv4(),
        sender: "bot",
        text: data.reply,
      }

      updateSessionMessages((currentMessages) => [
        ...currentMessages,
        botMessage,
      ])
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Reply failed", "error")
      updateSessionMessages((currentMessages) =>
        currentMessages.filter((message) => message.id !== userMessage.id)
      )
    } finally {
      setIsReplying(false)
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
      const transcript = Array.from(event.results)
        .map((result: any) => result[0].transcript)
        .join("")
      setIncomingMessage(transcript)
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
        onNewChat={newSession}
      />

      <main className="flex-1 flex flex-col overflow-hidden">
        {step === "setup" && !profile ? (
          <div className="flex-1 flex items-center justify-center p-4">
            <div className="w-full max-w-md space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Create Your Bot
                </h2>
                <p className="text-gray-600">
                  Teach the bot your communication style
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Alex"
                    value={userName}
                    onChange={(e) =>
                      updateSession({ userName: e.target.value })
                    }
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Relationship Type
                  </label>
                  <select
                    value={role}
                    onChange={(e) =>
                      updateSession({ role: e.target.value as BotRole })
                    }
                    className="input-field"
                  >
                    {ROLE_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label} - {option.detail}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Chat Samples
                  </label>
                  <textarea
                    placeholder="Paste examples of your chat messages..."
                    value={oldChats}
                    onChange={(e) => updateSession({ oldChats: e.target.value })}
                    className="textarea-field h-32"
                  />
                </div>

                <button
                  onClick={learnStyle}
                  disabled={isLearning || !userName.trim()}
                  className="btn-primary w-full"
                >
                  {isLearning ? "Learning Style..." : "Create Bot"}
                </button>
              </div>
            </div>
          </div>
        ) : profile ? (
          <div className="flex flex-col h-full">
            <div className="bg-gray-900 text-white p-4">
              <h3 className="font-semibold">{userName}</h3>
              <p className="text-sm opacity-90">
                Role: {ROLE_OPTIONS.find((option) => option.value === role)?.label}
              </p>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
              {messages.length === 0 ? (
                <div className="h-full flex items-center justify-center text-center">
                  <div>
                    <p className="text-gray-600 mb-4">
                      Start a conversation with {userName}
                    </p>
                    <p className="text-sm text-gray-500">
                      The bot will respond in their style
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  {messages.map((msg) => (
                    <ChatMessage key={msg.id} sender={msg.sender} text={msg.text} />
                  ))}

                  {isReplying && (
                    <div className="flex gap-2 text-gray-600">
                      <span>{userName} is replying</span>
                      <TypingIndicator />
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            <div className="border-t border-gray-200 bg-white p-4 md:p-6">
              <form onSubmit={sendMessage} className="max-w-4xl mx-auto space-y-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={incomingMessage}
                    onChange={(e) => setIncomingMessage(e.target.value)}
                    disabled={isReplying}
                    className="input-field flex-1 disabled:bg-gray-50"
                  />

                  {speechSupported && (
                    <button
                      type="button"
                      onClick={isListening ? stopListening : startListening}
                      disabled={isReplying || isSpeechProcessing}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        isListening
                          ? "bg-red-500 text-white"
                          : "bg-gray-200 hover:bg-gray-300 text-gray-900"
                      } disabled:opacity-50`}
                    >
                      {isListening ? "Stop" : "Speak"}
                    </button>
                  )}

                  <button
                    type="submit"
                    disabled={!incomingMessage.trim() || isReplying}
                    className="btn-primary disabled:opacity-50"
                  >
                    {isReplying ? "..." : "Send"}
                  </button>
                </div>

                {isListening && (
                  <p className="text-sm text-red-600">Listening...</p>
                )}
              </form>
            </div>

            <div className="border-t border-gray-200 bg-gray-50 p-4 text-center">
              <button
                onClick={() => {
                  setStep("setup")
                  updateSession({ messages: [] })
                }}
                className="text-sm text-primary hover:underline font-medium"
              >
                Edit Style
              </button>
            </div>
          </div>
        ) : null}
      </main>
    </div>
  )
}
