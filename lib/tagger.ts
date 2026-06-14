import { GoogleGenerativeAI } from "@google/generative-ai"
import { ConversationIntent, EmotionLabel } from "@/types/rag"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

export type ChunkTags = {
  intent: ConversationIntent
  emotion: EmotionLabel
  topicSummary: string
  isResolutionPresent: boolean
  isEscalation: boolean
}

const VALID_INTENTS: ConversationIntent[] = [
  "complaint", "query", "resolution", "escalation",
  "confirmation", "chitchat", "feedback", "unknown"
]

const VALID_EMOTIONS: EmotionLabel[] = [
  "angry", "frustrated", "confused", "neutral",
  "satisfied", "happy", "anxious"
]

function safeParse(raw: string): ChunkTags {
  try {
    // Strip markdown code fences if Gemini wraps in ```json
    const cleaned = raw.replace(/```json|```/g, "").trim()
    const parsed = JSON.parse(cleaned)

    return {
      intent: VALID_INTENTS.includes(parsed.intent)
        ? parsed.intent : "unknown",
      emotion: VALID_EMOTIONS.includes(parsed.emotion)
        ? parsed.emotion : "neutral",
      topicSummary: typeof parsed.topicSummary === "string"
        ? parsed.topicSummary.slice(0, 200) : "No summary",
      isResolutionPresent: Boolean(parsed.isResolutionPresent),
      isEscalation: Boolean(parsed.isEscalation),
    }
  } catch {
    return {
      intent: "unknown",
      emotion: "neutral",
      topicSummary: "Could not parse summary",
      isResolutionPresent: false,
      isEscalation: false,
    }
  }
}

export async function tagChunk(chunkText: string): Promise<ChunkTags> {
  const prompt = `
You are a conversation analyst. Analyze the following chat excerpt and respond ONLY with a valid JSON object. No explanation, no markdown, just raw JSON.

CHAT EXCERPT:
"""
${chunkText}
"""

Respond with exactly this JSON structure:
{
  "intent": one of: complaint | query | resolution | escalation | confirmation | chitchat | feedback | unknown,
  "emotion": one of: angry | frustrated | confused | neutral | satisfied | happy | anxious,
  "topicSummary": "one sentence describing what this conversation segment is about",
  "isResolutionPresent": true or false (was a solution or fix offered here?),
  "isEscalation": true or false (did the situation get worse or more intense here?)
}
`.trim()

  try {
    const result = await model.generateContent(prompt)
    const raw = result.response.text()
    return safeParse(raw)
  } catch {
    return {
      intent: "unknown",
      emotion: "neutral",
      topicSummary: "Tagging failed",
      isResolutionPresent: false,
      isEscalation: false,
    }
  }
}

// Tag all chunks with delay to avoid rate limits
export async function tagAllChunks(
  chunkTexts: string[]
): Promise<ChunkTags[]> {
  const tags: ChunkTags[] = []
  for (const text of chunkTexts) {
    const tag = await tagChunk(text)
    tags.push(tag)
    await new Promise((r) => setTimeout(r, 200)) // rate limit buffer
  }
  return tags
}