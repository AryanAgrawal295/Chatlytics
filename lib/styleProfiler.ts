import { StyleProfile } from "@/types/bot"

const CHAT_LINE = /^(?:\[[^\]]+\]\s*)?([^:\n]{1,80}):\s*(.+)$/
const EMOJI = /\p{Extended_Pictographic}/gu

type ParsedMessage = {
  speaker: string
  text: string
}

function isSystemLikeMessage(text: string): boolean {
  const normalized = text.toLowerCase().trim()
  return (
    /^(you deleted this message|this message was deleted|message deleted)$/.test(normalized) ||
    /messages and calls are end-to-end encrypted/.test(normalized) ||
    /\b(created this group|added .+|left|changed the subject|changed this group|security code changed)\b/.test(normalized) ||
    /^<media omitted>$/.test(normalized)
  )
}

function parseChat(transcript: string): ParsedMessage[] {
  const parsed: ParsedMessage[] = []

  for (const rawLine of transcript.split("\n")) {
    const line = rawLine.trim()
    if (!line) continue
    const match = line.match(CHAT_LINE)
    if (match) {
      parsed.push({ speaker: match[1].trim(), text: match[2].trim() })
    } else if (parsed.length > 0) {
      parsed[parsed.length - 1].text += ` ${line}`
    }
  }

  return parsed
}

function selectUserMessages(chat: ParsedMessage[], userName: string): string[] {
  const wantedName = userName.trim().toLowerCase()
  return chat
    .filter(
      (message) =>
        message.speaker.toLowerCase() === wantedName &&
        !isSystemLikeMessage(message.text)
    )
    .map((message) => message.text)
}

function buildReplyExamples(
  chat: ParsedMessage[],
  userName: string
): StyleProfile["replyExamples"] {
  const wantedName = userName.trim().toLowerCase()
  const examples: StyleProfile["replyExamples"] = []

  for (let i = 1; i < chat.length; i++) {
    const current = chat[i]
    const previous = chat[i - 1]
    if (
      current.speaker.toLowerCase() === wantedName &&
      previous.speaker.toLowerCase() !== wantedName &&
      !isSystemLikeMessage(current.text) &&
      !isSystemLikeMessage(previous.text)
    ) {
      examples.push({ incoming: previous.text, reply: current.text })
    }
  }

  return examples.slice(-80)
}

function detectLanguageMix(messages: string[]): string {
  const text = messages.join(" ").toLowerCase()
  const hinglishMarkers = [
    "hai", "haan", "nahi", "kya", "kaise", "acha", "bhai", "yaar",
    "mein", "kar", "ho", "tha", "abhi", "kal", "tum", "aap",
  ]
  const matches = hinglishMarkers.filter((word) =>
    new RegExp(`\\b${word}\\b`).test(text)
  ).length
  return matches >= 3 ? "Hinglish / conversational English" : "Mostly English"
}

function findCommonPhrases(messages: string[]): string[] {
  const counts = new Map<string, number>()
  for (const message of messages) {
    const words = message.toLowerCase().match(/[a-z0-9]+/g) || []
    for (let size = 2; size <= 3; size++) {
      for (let i = 0; i <= words.length - size; i++) {
        const phrase = words.slice(i, i + size).join(" ")
        counts.set(phrase, (counts.get(phrase) || 0) + 1)
      }
    }
  }

  return [...counts.entries()]
    .filter(([, count]) => count >= 2)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([phrase]) => phrase)
}

export function buildStyleProfile(
  transcripts: string | string[],
  userName: string
): StyleProfile {
  const chats = (Array.isArray(transcripts) ? transcripts : [transcripts])
    .map((transcript) => parseChat(transcript))
    .filter((chat) => chat.length > 0)
  const messages = chats.flatMap((chat) =>
    selectUserMessages(chat, userName)
  )
  if (messages.length < 3) {
    throw new Error(
      "At least 3 messages from the selected user are needed to learn a style."
    )
  }

  const words = messages.flatMap((message) => message.match(/\S+/g) || [])
  const letters = messages.join("").replace(/[^a-zA-Z]/g, "")
  const lowercase = letters.replace(/[^a-z]/g, "").length
  const uppercase = letters.replace(/[^A-Z]/g, "").length
  const emojiMatches = messages.join(" ").match(EMOJI) || []
  const emojiRatio = emojiMatches.length / messages.length
  const questionRatio = messages.filter((message) => message.includes("?")).length / messages.length
  const exclamationRatio = messages.filter((message) => message.includes("!")).length / messages.length
  const punctuation =
    questionRatio > 0.25
      ? "question-heavy and conversational"
      : exclamationRatio > 0.2
        ? "expressive with exclamation marks"
        : "light and informal"

  return {
    userName: userName.trim() || "User",
    tone: emojiRatio > 0.35 ? "expressive, warm, and informal" : "casual and direct",
    averageMessageWords: Math.max(1, Math.round(words.length / messages.length)),
    casing:
      letters.length === 0
        ? "mixed"
        : lowercase / letters.length > 0.85
          ? "mostly lowercase"
          : uppercase / letters.length > 0.45
            ? "mostly uppercase"
            : "mixed",
    punctuation,
    emojiFrequency:
      emojiRatio > 0.5 ? "frequent" : emojiRatio > 0.1 ? "occasional" : "rare",
    commonEmojis: [...new Set(emojiMatches)].slice(0, 6),
    commonPhrases: findCommonPhrases(messages),
    languageMix: detectLanguageMix(messages),
    sampleMessages: [...new Set(messages)].slice(-30),
    replyExamples: chats
      .flatMap((chat) => buildReplyExamples(chat, userName))
      .slice(-120),
  }
}
