export type BotRole =
  | "friend"
  | "relative"
  | "employee"
  | "manager"
  | "partner"
  | "casual"

export type StyleProfile = {
  userName: string
  tone: string
  averageMessageWords: number
  casing: "mostly lowercase" | "mostly uppercase" | "mixed"
  punctuation: string
  emojiFrequency: "rare" | "occasional" | "frequent"
  commonEmojis: string[]
  commonPhrases: string[]
  languageMix: string
  sampleMessages: string[]
  replyExamples: Array<{
    incoming: string
    reply: string
  }>
}

export type BotChatMessage = {
  id: string
  sender: "user" | "bot"
  text: string
}
