"use client"

import { Citation } from "@/types/rag"

interface ChatMessageProps {
  sender: "user" | "assistant" | "bot"
  text: string
  citations?: Citation[]
}

export function ChatMessage({
  sender,
  text,
  citations = [],
}: ChatMessageProps) {
  const isUser = sender === "user"
  const senderLabel =
    sender === "assistant" ? "Chatlytics" : sender === "bot" ? "Bot" : "You"

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`max-w-2xl px-4 py-3 rounded-lg ${
          isUser
            ? "text-white rounded-bl-none"
            : "bg-gray-100 text-gray-900 rounded-tl-none"
        }`}
        style={isUser ? { backgroundColor: "#10a37f" } : undefined}
      >
        <p
          className={`text-xs font-semibold mb-1 ${
            isUser ? "text-white/80" : "text-gray-500"
          }`}
        >
          {senderLabel}
        </p>
        <p className="text-sm md:text-base whitespace-pre-wrap break-words">
          {text}
        </p>
        {!isUser && citations.length > 0 ? (
          <div className="mt-3 border-t border-gray-300 pt-3 space-y-2">
            <p className="text-xs font-semibold text-gray-500">
              Supporting Segments
            </p>
            {citations.map((citation) => (
              <div
                key={`${citation.segment}-${citation.startLine}-${citation.endLine}`}
                className="rounded-md bg-white/70 px-3 py-2 text-xs text-gray-700"
              >
                <p className="font-semibold text-gray-800">
                  Segment {citation.segment} • lines {citation.startLine + 1}-
                  {citation.endLine + 1}
                </p>
                <p className="mt-1">{citation.summary}</p>
                <p className="mt-1 text-gray-600">
                  Speakers: {citation.speakers.join(", ") || "Unknown"} •{" "}
                  {citation.intent} • {citation.emotion}
                </p>
                <p className="mt-1 whitespace-pre-wrap break-words">
                  {citation.excerpt}
                  {citation.excerpt.length >= 260 ? "..." : ""}
                </p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}

interface FileDisplayProps {
  fileName: string
  size: string
}

export function FileDisplay({ fileName, size }: FileDisplayProps) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg text-sm">
      <span className="text-lg">📎</span>
      <div>
        <p className="font-medium text-gray-900">{fileName}</p>
        <p className="text-xs text-gray-600">{size}</p>
      </div>
    </div>
  )
}

interface TypingIndicatorProps {}

export function TypingIndicator({}: TypingIndicatorProps) {
  return (
    <div className="flex items-center gap-1">
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
      <div
        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
        style={{ animationDelay: "0.1s" }}
      />
      <div
        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
        style={{ animationDelay: "0.2s" }}
      />
    </div>
  )
}
