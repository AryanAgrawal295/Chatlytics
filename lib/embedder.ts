import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

// text-embedding-004: 768-dim, best free option, context-aware
const embeddingModel = genAI.getGenerativeModel({
  model: "text-embedding-004",
})

// Embed a single text (used for query embedding at retrieval time)
export async function embedText(text: string): Promise<number[]> {
  const result = await embeddingModel.embedContent(text)
  return result.embedding.values
}

// Embed the CONTEXTUAL text of each chunk
// contextualText = history prefix + intent/emotion tags + raw chunk
// This means the vector captures WHERE in the conversation this chunk sits
export async function embedChunks(
  contextualTexts: string[]
): Promise<number[][]> {
  const embeddings: number[][] = []

  for (const text of contextualTexts) {
    const embedding = await embedText(text)
    embeddings.push(embedding)
    // 150ms delay — stays within Gemini free tier limits
    await new Promise((r) => setTimeout(r, 150))
  }

  return embeddings
}