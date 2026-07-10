export type ConversationIntent =
  | "complaint"
  | "query"
  | "resolution"
  | "escalation"
  | "confirmation"
  | "chitchat"
  | "feedback"
  | "unknown"

export type EmotionLabel =
  | "angry"
  | "frustrated"
  | "confused"
  | "neutral"
  | "satisfied"
  | "happy"
  | "anxious"

export type SmartChunk = {
  id: string
  transcriptId: string
  userId: string
  text: string
  contextualText: string
  speakers: string[]
  dominantSpeaker: string
  turnIndex: number
  startLine: number
  endLine: number
  intent: ConversationIntent
  emotion: EmotionLabel
  topicSummary: string
  isResolutionPresent: boolean
  isEscalation: boolean
}

export type ChunkDraft = {
  id: string
  transcriptId: string
  userId: string
  text: string
  speakers: string[]
  dominantSpeaker: string
  turnIndex: number
  startLine: number
  endLine: number
}

export type IngestRequest = {
  transcript: string
  userId: string
  fileName?: string
}

export type AnalyzeRequest = {
  question: string
  transcriptId: string
  userId: string
}

export type RetrievedChunk = {
  text: string
  contextualText: string
  speakers: string[]
  intent: ConversationIntent
  emotion: EmotionLabel
  topicSummary: string
  turnIndex: number
  startLine: number
  endLine: number
  isResolutionPresent: boolean
  isEscalation: boolean
  semanticScore: number
  rerankScore?: number
  finalScore?: number
}

export type Citation = {
  segment: number
  summary: string
  excerpt: string
  speakers: string[]
  startLine: number
  endLine: number
  intent: ConversationIntent
  emotion: EmotionLabel
}
