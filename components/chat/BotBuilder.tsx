"use client"

import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react"
import { BotChatMessage, BotRole, StyleProfile } from "@/types/bot"

const ROLE_OPTIONS: Array<{ value: BotRole; label: string; detail: string }> = [
  { value: "friend", label: "Friend", detail: "Warm, honest, relaxed" },
  { value: "relative", label: "Relative", detail: "Familiar and caring" },
  { value: "employee", label: "Employee", detail: "Respectful and clear" },
  { value: "manager", label: "Manager", detail: "Calm and decisive" },
  { value: "partner", label: "Love partner", detail: "Affectionate and attentive" },
  { value: "casual", label: "Casual", detail: "Natural and low-pressure" },
]

type ProfileResponse = {
  success?: boolean
  profile?: StyleProfile
  error?: string
}

type ChatResponse = {
  reply?: string
  error?: string
}

type StyleSourceFile = {
  id: string
  name: string
  content: string
  size: number
}

type BotBuilderSession = {
  id: string
  title: string
  oldChats: string
  styleFiles: StyleSourceFile[]
  userName: string
  role: BotRole
  profile: StyleProfile | null
  messages: BotChatMessage[]
  incomingMessage: string
  createdAt: number
  updatedAt: number
}

const BOT_BUILDER_STORAGE_KEY = "chatlytics.botBuilder.v1"

function newBotBuilderSession(): BotBuilderSession {
  const now = Date.now()
  return {
    id: crypto.randomUUID(),
    title: "New style session",
    oldChats: "",
    styleFiles: [],
    userName: "",
    role: "friend",
    profile: null,
    messages: [],
    incomingMessage: "",
    createdAt: now,
    updatedAt: now,
  }
}

function botSessionTitle(
  userName: string,
  styleFiles: StyleSourceFile[]
): string {
  if (userName.trim()) return `${userName.trim()} style`
  if (styleFiles[0]) return styleFiles[0].name.replace(/\.txt$/i, "")
  return "New style session"
}

export function BotBuilder() {
  const [oldChats, setOldChats] = useState("")
  const [styleFiles, setStyleFiles] = useState<StyleSourceFile[]>([])
  const [userName, setUserName] = useState("")
  const [role, setRole] = useState<BotRole>("friend")
  const [profile, setProfile] = useState<StyleProfile | null>(null)
  const [messages, setMessages] = useState<BotChatMessage[]>([])
  const [incomingMessage, setIncomingMessage] = useState("")
  const [isLearning, setIsLearning] = useState(false)
  const [isReplying, setIsReplying] = useState(false)
  const [notice, setNotice] = useState("")
  const [error, setError] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [speechSupported, setSpeechSupported] = useState(false)
  const [isRestored, setIsRestored] = useState(false)
  const [isHistoryOpen, setIsHistoryOpen] = useState(false)
  const [sessions, setSessions] = useState<BotBuilderSession[]>([])
  const [currentSessionId, setCurrentSessionId] = useState("")
  const recognitionRef = useRef<{ stop: () => void; abort: () => void } | null>(null)
  const chatThreadRef = useRef<HTMLDivElement | null>(null)

  function applySession(session: BotBuilderSession) {
    recognitionRef.current?.abort()
    setOldChats(session.oldChats)
    setStyleFiles(session.styleFiles)
    setUserName(session.userName)
    setRole(session.role)
    setProfile(session.profile)
    setMessages(session.messages)
    setIncomingMessage(session.incomingMessage)
    setError("")
    setNotice("")
    setIsListening(false)
  }

  function snapshotSession(session: BotBuilderSession): BotBuilderSession {
    return {
      ...session,
      title: botSessionTitle(userName, styleFiles),
      oldChats,
      styleFiles,
      userName,
      role,
      profile,
      messages,
      incomingMessage,
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
    setIsHistoryOpen(false)
  }

  function createNewSession() {
    const next = newBotBuilderSession()
    setSessions((current) => [
      ...current.map((session) =>
        session.id === currentSessionId ? snapshotSession(session) : session
      ),
      next,
    ])
    setCurrentSessionId(next.id)
    applySession(next)
    setIsHistoryOpen(false)
  }

  useEffect(() => {
    setSpeechSupported(
      Boolean(window.SpeechRecognition || window.webkitSpeechRecognition)
    )
    return () => recognitionRef.current?.abort()
  }, [])

  useEffect(() => {
    try {
      const saved = localStorage.getItem(BOT_BUILDER_STORAGE_KEY)
      if (saved) {
        const state = JSON.parse(saved) as {
          currentSessionId?: string
          sessions?: BotBuilderSession[]
        }
        if (Array.isArray(state.sessions) && state.sessions.length > 0) {
          const current =
            state.sessions.find(
              (session) => session.id === state.currentSessionId
            ) || state.sessions[0]
          setSessions(state.sessions)
          setCurrentSessionId(current.id)
          applySession(current)
          setIsRestored(true)
          return
        }
      }

      const initial = newBotBuilderSession()
      setSessions([initial])
      setCurrentSessionId(initial.id)
      applySession(initial)
    } catch {
      localStorage.removeItem(BOT_BUILDER_STORAGE_KEY)
      const initial = newBotBuilderSession()
      setSessions([initial])
      setCurrentSessionId(initial.id)
      applySession(initial)
    } finally {
      setIsRestored(true)
    }
  }, [])

  useEffect(() => {
    if (!isRestored || !currentSessionId) return
    setSessions((current) =>
      current.map((session) =>
        session.id === currentSessionId ? snapshotSession(session) : session
      )
    )
  }, [
    currentSessionId,
    incomingMessage,
    isRestored,
    messages,
    oldChats,
    profile,
    role,
    styleFiles,
    userName,
  ])

  useEffect(() => {
    if (!isRestored || !currentSessionId) return
    try {
      localStorage.setItem(
        BOT_BUILDER_STORAGE_KEY,
        JSON.stringify({ currentSessionId, sessions })
      )
    } catch {
      // Large source files can exceed browser storage; the active session still works.
    }
  }, [currentSessionId, isRestored, sessions])

  useEffect(() => {
    const thread = chatThreadRef.current
    if (thread) thread.scrollTop = thread.scrollHeight
  }, [isReplying, messages])

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
    const existingMessage = incomingMessage.trim()
    recognition.continuous = false
    recognition.interimResults = true
    recognition.lang = navigator.language || "en-IN"
    recognition.onstart = () => {
      setError("")
      setNotice("Listening...")
      setIsListening(true)
    }
    recognition.onresult = (event) => {
      let spokenText = ""
      for (let i = 0; i < event.results.length; i++) {
        spokenText += event.results[i][0].transcript
      }
      setIncomingMessage(
        [existingMessage, spokenText.trim()]
          .filter(Boolean)
          .join(existingMessage ? " " : "")
      )
    }
    recognition.onerror = (event) => {
      setError(
        event.error === "not-allowed"
          ? "Microphone permission was denied."
          : event.error === "no-speech"
            ? "No speech was detected. Please try again."
            : "Speech input failed. Please try again."
      )
      setNotice("")
      setIsListening(false)
    }
    recognition.onend = () => {
      recognitionRef.current = null
      setIsListening(false)
      setNotice("")
    }
    recognitionRef.current = recognition
    recognition.start()
  }

  async function uploadStyleFiles(event: ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(event.target.files || [])
    const remainingSlots = Math.max(0, 12 - styleFiles.length)
    const files = selected.slice(0, remainingSlots)
    if (files.length === 0) return

    const loaded = await Promise.all(
      files.map(async (file) => ({
        id: `${file.name}:${file.size}:${file.lastModified}`,
        name: file.name,
        content: await file.text(),
        size: file.size,
      }))
    )

    setStyleFiles((current) => {
      const existingIds = new Set(current.map((file) => file.id))
      return [
        ...current,
        ...loaded.filter((file) => !existingIds.has(file.id)),
      ].slice(0, 12)
    })
    setProfile(null)
    setMessages([])
    setError("")
    setNotice(
      selected.length > files.length
        ? `${loaded.length} files added. The style profile supports up to 12 files at a time.`
        : `${loaded.length} chat file${loaded.length === 1 ? "" : "s"} added.`
    )
    event.target.value = ""
  }

  function removeStyleFile(fileId: string) {
    setStyleFiles((current) => current.filter((file) => file.id !== fileId))
    setProfile(null)
    setMessages([])
    setNotice("")
  }

  async function learnStyle() {
    if (
      (!oldChats.trim() && styleFiles.length === 0) ||
      !userName.trim() ||
      isLearning
    ) return
    setIsLearning(true)
    setError("")
    setNotice("Learning your message patterns...")

    try {
      const response = await fetch("/api/bot/profile", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          transcripts: [
            ...styleFiles.map((file) => ({
              name: file.name,
              content: file.content,
            })),
            ...(oldChats.trim()
              ? [{ name: "Pasted chat", content: oldChats }]
              : []),
          ],
          userName,
        }),
      })
      const data = (await response.json()) as ProfileResponse
      if (!response.ok || !data.profile) {
        throw new Error(data.error || "Failed to learn your style")
      }
      setProfile(data.profile)
      setMessages([])
      setNotice("Style profile ready. Select a role and start testing.")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to learn your style")
      setNotice("")
    } finally {
      setIsLearning(false)
    }
  }

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const text = incomingMessage.trim()
    if (!profile || !text || isReplying) return

    const incoming: BotChatMessage = {
      id: crypto.randomUUID(),
      sender: "user",
      text,
    }
    const nextMessages = [...messages, incoming]
    setMessages(nextMessages)
    setIncomingMessage("")
    setIsReplying(true)
    setError("")
    setNotice("")

    try {
      const response = await fetch("/api/bot/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          role,
          profile,
          conversation: messages,
          message: text,
        }),
      })
      const data = (await response.json()) as ChatResponse
      if (!response.ok || !data.reply) {
        throw new Error(data.error || "Failed to generate a reply")
      }
      setMessages((current) => [
        ...current,
        { id: crypto.randomUUID(), sender: "bot", text: data.reply! },
      ])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate a reply")
    } finally {
      setIsReplying(false)
    }
  }

  return (
    <>
      {isHistoryOpen ? (
        <>
          <button
            className="transcript-drawer-backdrop"
            type="button"
            aria-label="Close style session history"
            onClick={() => setIsHistoryOpen(false)}
          />
          <aside className="transcript-drawer" aria-label="Style sessions">
            <div className="transcript-drawer-header">
              <div>
                <p className="eyebrow">Bot Builder</p>
                <h2>Style sessions</h2>
              </div>
              <button
                className="text-button"
                type="button"
                onClick={() => setIsHistoryOpen(false)}
              >
                Close
              </button>
            </div>

            <button
              className="primary-button new-transcript-button"
              type="button"
              disabled={isLearning || isReplying}
              onClick={createNewSession}
            >
              New style session
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
                    disabled={isLearning || isReplying}
                    onClick={() => openSession(session.id)}
                  >
                    <strong>{session.title}</strong>
                    <span>
                      {session.styleFiles.length} files / {session.messages.length} messages
                    </span>
                    <small>{new Date(session.updatedAt).toLocaleDateString()}</small>
                  </button>
                ))}
            </div>
          </aside>
        </>
      ) : null}

      <div className="bot-builder-workspace">
        <button
          className="transcript-history-button"
          type="button"
          onClick={() => setIsHistoryOpen(true)}
        >
          Style sessions
          <span>{sessions.length}</span>
        </button>
        <section className="bot-builder-layout">
      <aside className="bot-config-panel">
        <div className="builder-section">
          <div className="step-label">Step 1</div>
          <div className="panel-heading compact-heading">
            <div>
              <h2>Learn your style</h2>
              <p>Add multiple chats where your messages use one consistent name.</p>
            </div>
            <label className="file-button secondary-button">
              Add .txt files
              <input
                accept=".txt,text/plain"
                type="file"
                multiple
                onChange={uploadStyleFiles}
              />
            </label>
          </div>

          {styleFiles.length > 0 ? (
            <div className="style-file-list" aria-label="Selected chat files">
              {styleFiles.map((file) => (
                <div className="style-file-item" key={file.id}>
                  <div>
                    <strong>{file.name}</strong>
                    <span>{Math.max(1, Math.round(file.size / 1024))} KB</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeStyleFile(file.id)}
                    aria-label={`Remove ${file.name}`}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          ) : null}

          <label className="field-label">
            Your name in this chat
            <input
              className="text-field"
              placeholder="Example: Aryan Agrawal"
              value={userName}
              onChange={(event) => {
                setUserName(event.target.value)
                setProfile(null)
              }}
            />
          </label>

          <label className="field-label">
            Old chat samples
            <textarea
              className="style-source-input"
              placeholder="Paste an exported chat here..."
              value={oldChats}
              onChange={(event) => {
                setOldChats(event.target.value)
                setProfile(null)
              }}
            />
          </label>

          <div className="action-row builder-actions">
            <button
              className="primary-button"
              type="button"
              disabled={
                (!oldChats.trim() && styleFiles.length === 0) ||
                !userName.trim() ||
                isLearning
              }
              onClick={learnStyle}
            >
              {isLearning ? "Learning..." : "Learn My Style"}
            </button>
            {styleFiles.length > 0 ? (
              <span className="inline-status">
                {styleFiles.length} file{styleFiles.length === 1 ? "" : "s"} selected
              </span>
            ) : null}
          </div>
        </div>

        <div className="builder-section">
          <div className="step-label">Step 2</div>
          <h2>Choose relationship role</h2>
          <div className="role-grid" aria-label="Bot relationship role">
            {ROLE_OPTIONS.map((option) => (
              <button
                className={role === option.value ? "role-option selected" : "role-option"}
                type="button"
                key={option.value}
                onClick={() => {
                  setRole(option.value)
                  setMessages([])
                }}
              >
                <strong>{option.label}</strong>
                <span>{option.detail}</span>
              </button>
            ))}
          </div>
        </div>

        {profile ? (
          <div className="style-profile">
            <div className="profile-status"><span /> Style learned</div>
            <dl>
              <div><dt>Tone</dt><dd>{profile.tone}</dd></div>
              <div><dt>Length</dt><dd>About {profile.averageMessageWords} words</dd></div>
              <div><dt>Language</dt><dd>{profile.languageMix}</dd></div>
              <div><dt>Emoji use</dt><dd>{profile.emojiFrequency}</dd></div>
            </dl>
            {profile.commonPhrases.length > 0 ? (
              <div className="phrase-list">
                {profile.commonPhrases.slice(0, 4).map((phrase) => (
                  <span key={phrase}>{phrase}</span>
                ))}
              </div>
            ) : null}
          </div>
        ) : null}
      </aside>

      <div className="bot-chat-panel">
        <div className="bot-chat-header">
          <div>
            <div className="step-label">Step 3</div>
            <h2>Test conversation</h2>
            <p>{profile ? `Replying as ${ROLE_OPTIONS.find((item) => item.value === role)?.label}` : "Learn your style first"}</p>
          </div>
          {messages.length > 0 ? (
            <button className="text-button" type="button" onClick={() => setMessages([])}>
              Clear chat
            </button>
          ) : null}
        </div>

        <div className="chat-thread" aria-live="polite" ref={chatThreadRef}>
          {messages.length === 0 ? (
            <div className="empty-chat-state">
              <strong>{profile ? "Send a message from the other person" : "Your style profile is not ready"}</strong>
              <p>{profile ? "The bot will reply in your learned style and selected role." : "Add old chats and click Learn My Style to begin."}</p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                className={message.sender === "bot" ? "chat-message bot-message" : "chat-message incoming-message"}
                key={message.id}
              >
                <span>{message.sender === "bot" ? "Your bot" : "Other person"}</span>
                <p>{message.text}</p>
              </div>
            ))
          )}
          {isReplying ? <div className="typing-indicator">Writing in your style...</div> : null}
        </div>

        <form className="chat-composer" onSubmit={sendMessage}>
          <textarea
            placeholder="Type what the other person said..."
            value={incomingMessage}
            disabled={!profile || isReplying}
            onChange={(event) => setIncomingMessage(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault()
                event.currentTarget.form?.requestSubmit()
              }
            }}
          />
          <button
            className={isListening ? "speech-button listening" : "speech-button"}
            type="button"
            disabled={!profile || !speechSupported || isReplying}
            onClick={toggleSpeechInput}
            title={
              speechSupported
                ? "Speak the other person's message"
                : "Speech input is not supported by this browser"
            }
          >
            {isListening ? "Stop" : "Speak"}
          </button>
          <button
            className="primary-button send-button"
            type="submit"
            disabled={!profile || !incomingMessage.trim() || isReplying}
          >
            Send
          </button>
        </form>

        {(notice || error) && (
          <div className={error ? "builder-notice error" : "builder-notice"}>
            {error || notice}
          </div>
        )}
      </div>
        </section>
      </div>
    </>
  )
}
