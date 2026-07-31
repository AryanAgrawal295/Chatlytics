import { embedText } from "./embedder"
import { getPineconeIndex } from "./pinecone"
import { RetrievedChunk, ConversationIntent, EmotionLabel } from "@/types/rag"
import { generateText } from "./gemini"

type HybridChunk = RetrievedChunk & {
  lexicalScore?: number
}

function normalizeForSearch(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

function tokenize(text: string): string[] {
  return normalizeForSearch(text)
    .split(" ")
    .filter((token) => token.length >= 2)
}

function extractKeywordQuery(question: string): string {
  const stopWords = new Set([
    "a",
    "an",
    "and",
    "are",
    "at",
    "be",
    "did",
    "does",
    "for",
    "from",
    "how",
    "i",
    "in",
    "is",
    "it",
    "me",
    "of",
    "on",
    "or",
    "the",
    "this",
    "to",
    "was",
    "what",
    "when",
    "where",
    "who",
    "why",
  ])

  return tokenize(question)
    .filter((token) => !stopWords.has(token))
    .slice(0, 8)
    .join(" ")
}

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
    const raw = (await generateText(prompt)).trim().toLowerCase() as ConversationIntent
    const valid: ConversationIntent[] = [
      "complaint",
      "query",
      "resolution",
      "escalation",
      "confirmation",
      "chitchat",
      "feedback",
      "unknown",
    ]
    return valid.includes(raw) ? raw : "unknown"
  } catch {
    return "unknown"
  }
}

function lexicalScore(question: string, chunk: RetrievedChunk): number {
  const queryTokens = tokenize(question)
  if (queryTokens.length === 0) return 0

  const searchableText = ` ${normalizeForSearch(
    [
      chunk.topicSummary,
      chunk.text,
      chunk.speakers.join(" "),
      chunk.intent,
      chunk.emotion,
    ].join(" ")
  )} `

  let exactHits = 0
  let partialHits = 0

  for (const token of queryTokens) {
    if (searchableText.includes(` ${token} `)) {
      exactHits++
    } else if (searchableText.includes(token)) {
      partialHits++
    }
  }

  const exactRatio = exactHits / queryTokens.length
  const partialRatio = partialHits / queryTokens.length
  return exactRatio + partialRatio * 0.35
}

function dedupeChunks(chunks: RetrievedChunk[]): RetrievedChunk[] {
  const seen = new Set<string>()
  const unique: RetrievedChunk[] = []

  for (const chunk of chunks) {
    const key = `${chunk.turnIndex}:${chunk.startLine}:${chunk.endLine}:${chunk.text}`
    if (seen.has(key)) continue
    seen.add(key)
    unique.push(chunk)
  }

  return unique
}

async function fetchDenseCandidates(
  queryText: string,
  transcriptId: string,
  userId: string,
  topK: number
): Promise<RetrievedChunk[]> {
  if (!queryText.trim()) return []

  const queryVector = await embedText(queryText)
  const index = getPineconeIndex()
  const results = await index.query({
    vector: queryVector,
    topK,
    includeMetadata: true,
    filter: {
      transcriptId: { $eq: transcriptId },
      userId: { $eq: userId },
    },
  })

  return (results.matches || []).map((match) => ({
    text: (match.metadata?.text as string) || "",
    contextualText: (match.metadata?.contextualText as string) || "",
    speakers: (match.metadata?.speakers as string[]) || [],
    intent: (match.metadata?.intent as ConversationIntent) || "unknown",
    emotion: (match.metadata?.emotion as EmotionLabel) || "neutral",
    topicSummary: (match.metadata?.topicSummary as string) || "",
    turnIndex: (match.metadata?.turnIndex as number) || 0,
    startLine: (match.metadata?.startLine as number) || 0,
    endLine: (match.metadata?.endLine as number) || 0,
    isResolutionPresent: Boolean(match.metadata?.isResolutionPresent),
    isEscalation: Boolean(match.metadata?.isEscalation),
    semanticScore: match.score || 0,
  }))
}

async function rerankChunks(
  question: string,
  chunks: HybridChunk[]
): Promise<HybridChunk[]> {
  if (chunks.length === 0) return chunks

  const chunkList = chunks
    .map(
      (chunk, i) =>
        `[${i}] ${chunk.topicSummary}\nIntent: ${chunk.intent}\nText: ${chunk.text.slice(0, 360)}`
    )
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
    const raw = (await generateText(prompt)).replace(/```json|```/g, "").trim()
    const scores: number[] = JSON.parse(raw)

    return chunks.map((chunk, i) => {
      const rerankScore = scores[i] ?? 0
      const semanticComponent = chunk.semanticScore * 10 * 0.35
      const lexicalComponent = (chunk.lexicalScore ?? 0) * 10 * 0.25
      const rerankComponent = rerankScore * 0.4

      return {
        ...chunk,
        rerankScore,
        finalScore: rerankComponent + semanticComponent + lexicalComponent,
      }
    })
  } catch {
    return chunks.map((chunk) => ({
      ...chunk,
      rerankScore: 0,
      finalScore:
        chunk.semanticScore * 10 * 0.7 + (chunk.lexicalScore ?? 0) * 10 * 0.3,
    }))
  }
}

export async function retrieveAndRank(
  question: string,
  transcriptId: string,
  userId: string,
  topK = 5
): Promise<RetrievedChunk[]> {
  const queryIntent = await detectQueryIntent(question)
  const keywordQuery = extractKeywordQuery(question)
  const normalizedQuestion = normalizeForSearch(question)
  const expandedQuery =
    keywordQuery && keywordQuery !== normalizedQuestion
      ? `${question}\nKeywords: ${keywordQuery}`
      : ""

  const [primaryCandidates, keywordCandidates, expandedCandidates] =
    await Promise.all([
      fetchDenseCandidates(question, transcriptId, userId, topK * 4),
      fetchDenseCandidates(keywordQuery, transcriptId, userId, topK * 2),
      fetchDenseCandidates(expandedQuery, transcriptId, userId, topK * 2),
    ])

  let chunks = dedupeChunks([
    ...primaryCandidates,
    ...keywordCandidates,
    ...expandedCandidates,
  ]) as HybridChunk[]

  if (chunks.length === 0) return []

  chunks = chunks.map((chunk) => ({
    ...chunk,
    lexicalScore: lexicalScore(question, chunk),
  }))

  if (queryIntent !== "unknown") {
    chunks = chunks.map((chunk) => ({
      ...chunk,
      semanticScore:
        chunk.intent === queryIntent
          ? chunk.semanticScore * 1.2
          : chunk.semanticScore,
      lexicalScore:
        chunk.intent === queryIntent
          ? (chunk.lexicalScore ?? 0) + 0.15
          : chunk.lexicalScore,
    }))
  }

  const reranked = await rerankChunks(question, chunks)

  return reranked
    .sort((a, b) => (b.finalScore ?? 0) - (a.finalScore ?? 0))
    .slice(0, topK)
}
