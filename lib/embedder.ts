import { GoogleGenAI } from "@google/genai"

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
})

// Embed a single text (used for query embedding at retrieval time)
export async function embedText(text: string): Promise<number[]> {
  const response = await ai.models.embedContent({
    model: "gemini-embedding-2",
    contents: text,
    config: {
      outputDimensionality: 768,
    },
  })

  return response.embeddings![0].values!
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
    await new Promise((r) => setTimeout(r, 150))
  }

  return embeddings
}