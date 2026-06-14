import { embedText } from "./embedder"
import { getPineconeIndex } from "./pinecone"
import { RetrievedChunk, ConversationIntent, EmotionLabel } from "@/types/rag"
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

// ── 1. Detect what kind of question was asked ──────────────────────────────
// Used to BOOST chunks matching the question's intent
async function detectQueryIntent(
  question: string
): Promise<ConversationIntent> {
  const prompt = `
Classify this question into one of these categories:
complaint | query | resolution | escalation | confirmation | chitchat | feedback | unknown

Question: "${question}"
Respond with ONLY the category word, nothing else.
`.trim()

  try {
    const result = await model.generateContent(prompt)
    const raw = result.response.text().trim().toLowerCase() as ConversationIntent
    const valid: ConversationIntent[] = [
      "complaint", "query", "resolution", "escalation",
      "confirmation", "chitchat", "feedback", "unknown"
    ]
    return valid.includes(raw) ? raw : "unknown"
  } catch {
    return "unknown"
  }
}

// ── 2. Re-rank retrieved chunks by relevance to question ───────────────────
// Cross-encoder re-ranking: ask Gemini to score each chunk 0–10
// Much more accurate than cosine similarity alone
async function rerankChunks(
  question: string,
  chunks: RetrievedChunk[]
): Promise<RetrievedChunk[]> {
  if (chunks.length === 0) return chunks

  const chunkList = chunks
    .map((c, i) => `[${i}] ${c.topicSummary}\nText: ${c.text.slice(0, 300)}`)
    .join("\n\n")

  const prompt = `
You are a retrieval relevance scorer.
Given a question and conversation excerpts, score each excerpt's relevance to the question from 0 to 10.

Question: "${question}"

Excerpts:
${chunkList}

Respond ONLY with a JSON array of numbers (scores), one per excerpt, in order.
Example: [8, 3, 9, 1, 6]
`.trim()

  try {
    const result = await model.generateContent(prompt)
    const raw = result.response.text().replace(/```json|```/g, "").trim()
    const scores: number[] = JSON.parse(raw)

    return chunks.map((chunk, i) => ({
      ...chunk,
      rerankScore: scores[i] ?? 0,
      // Final score: 60% re-rank + 40% semantic similarity
      finalScore: (scores[i] ?? 0) * 0.6 + chunk.semanticScore * 10 * 0.4,
    }))
  } catch {
    // If re-ranking fails, fall back to semantic score only
    return chunks.map((c) => ({
      ...c,
      rerankScore: 0,
      finalScore: c.semanticScore * 10,
    }))
  }
}

// ── 3. Main retrieval function ─────────────────────────────────────────────
export async function retrieveAndRank(
  question: string,
  transcriptId: string,
  userId: string,
  topK = 5
): Promise<RetrievedChunk[]> {
  // Step A: Embed the question
  const queryVector = await embedText(question)

  // Step B: Detect question intent for metadata boosting
  const queryIntent = await detectQueryIntent(question)

  // Step C: Query Pinecone — fetch more than topK so re-ranker has room
  const index = getPineconeIndex()
  const results = await index.query({
    vector: queryVector,
    topK: topK * 3, // fetch 15 if topK=5, re-ranker will cut to 5
    includeMetadata: true,
    filter: {
      transcriptId: { $eq: transcriptId },
      userId: { $eq: userId },
    },
  })

  if (!results.matches || results.matches.length === 0) return []

  // Step D: Map Pinecone results to RetrievedChunk type
  let chunks: RetrievedChunk[] = results.matches.map((match) => ({
    text: (match.metadata?.text as string) || "",
    contextualText: (match.metadata?.contextualText as string) || "",
    speakers: (match.metadata?.speakers as string[]) || [],
    intent: (match.metadata?.intent as ConversationIntent) || "unknown",
    emotion: (match.metadata?.emotion as EmotionLabel) || "neutral",
    topicSummary: (match.metadata?.topicSummary as string) || "",
    turnIndex: (match.metadata?.turnIndex as number) || 0,
    isResolutionPresent: Boolean(match.metadata?.isResolutionPresent),
    isEscalation: Boolean(match.metadata?.isEscalation),
    semanticScore: match.score || 0,
  }))

  // Step E: INTENT BOOST
  // Chunks matching the question's intent get a score bump
  // e.g. "how was the complaint resolved?" → boost resolution chunks
  if (queryIntent !== "unknown") {
    chunks = chunks.map((c) => ({
      ...c,
      semanticScore: c.intent === queryIntent
        ? c.semanticScore * 1.3  // 30% boost for intent match
        : c.semanticScore,
    }))
  }

  // Step F: Re-rank using Gemini cross-encoder
  const reranked = await rerankChunks(question, chunks)

  // Step G: Sort by final score, return top K
  return reranked
    .sort((a, b) => (b.finalScore ?? 0) - (a.finalScore ?? 0))
    .slice(0, topK)
}
