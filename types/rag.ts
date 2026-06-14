// Intent of a conversation segment
export type ConversationIntent =
  | "complaint"      // customer raising a problem
  | "query"          // asking for information
  | "resolution"     // problem being solved
  | "escalation"     // situation getting worse
  | "confirmation"   // agreeing / confirming
  | "chitchat"       // small talk, greetings
  | "feedback"       // customer giving opinion
  | "unknown"

// Emotional tone of a segment
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

  // Core content
  text: string                    // raw chunk text
  contextualText: string          // text WITH history prefix → what gets embedded

  // Conversation signals
  speakers: string[]              // all speakers in this chunk
  dominantSpeaker: string         // who speaks most in this chunk
  turnIndex: number               // position in conversation
  startLine: number               // which line this chunk starts at
  endLine: number                 // which line this chunk ends at

  // Semantic signals (from tagger)
  intent: ConversationIntent
  emotion: EmotionLabel
  topicSummary: string            // 1-sentence summary of what this chunk is about
  isResolutionPresent: boolean    // did this chunk contain a resolution?
  isEscalation: boolean          // did sentiment worsen here?
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
  isResolutionPresent: boolean
  isEscalation: boolean
  semanticScore: number           // from Pinecone cosine similarity
  rerankScore?: number            // from re-ranker (higher = more relevant)
  finalScore?: number             // combined score used for final ranking
}
