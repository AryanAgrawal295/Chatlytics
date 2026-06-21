"use client"

import { ChangeEvent, FormEvent, useState } from "react"
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

export function BotBuilder() {
  const [oldChats, setOldChats] = useState("")
  const [styleFileName, setStyleFileName] = useState("")
  const [userName, setUserName] = useState("")
  const [role, setRole] = useState<BotRole>("friend")
  const [profile, setProfile] = useState<StyleProfile | null>(null)
  const [messages, setMessages] = useState<BotChatMessage[]>([])
  const [incomingMessage, setIncomingMessage] = useState("")
  const [isLearning, setIsLearning] = useState(false)
  const [isReplying, setIsReplying] = useState(false)
  const [notice, setNotice] = useState("")
  const [error, setError] = useState("")

  async function uploadStyleFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return
    setStyleFileName(file.name)
    setOldChats(await file.text())
    setProfile(null)
    setMessages([])
    setError("")
    setNotice("Old chat loaded. Enter your chat name and learn the style.")
  }

  async function learnStyle() {
    if (!oldChats.trim() || !userName.trim() || isLearning) return
    setIsLearning(true)
    setError("")
    setNotice("Learning your message patterns...")

    try {
      const response = await fetch("/api/bot/profile", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ transcript: oldChats, userName }),
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
    <section className="bot-builder-layout">
      <aside className="bot-config-panel">
        <div className="builder-section">
          <div className="step-label">Step 1</div>
          <div className="panel-heading compact-heading">
            <div>
              <h2>Learn your style</h2>
              <p>Use a chat where your messages appear under one consistent name.</p>
            </div>
            <label className="file-button secondary-button">
              Upload .txt
              <input accept=".txt,text/plain" type="file" onChange={uploadStyleFile} />
            </label>
          </div>

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
                setStyleFileName("")
                setProfile(null)
              }}
            />
          </label>

          <div className="action-row builder-actions">
            <button
              className="primary-button"
              type="button"
              disabled={!oldChats.trim() || !userName.trim() || isLearning}
              onClick={learnStyle}
            >
              {isLearning ? "Learning..." : "Learn My Style"}
            </button>
            {styleFileName ? <span className="inline-status">{styleFileName}</span> : null}
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

        <div className="chat-thread" aria-live="polite">
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
  )
}
