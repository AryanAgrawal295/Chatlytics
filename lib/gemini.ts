import { GoogleGenAI } from "@google/genai"

export const GEMINI_GENERATION_MODEL =
  process.env.GEMINI_GENERATION_MODEL || "gemini-2.5-flash"

export const geminiAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
})

export async function generateText(prompt: string): Promise<string> {
  const response = await geminiAI.models.generateContent({
    model: GEMINI_GENERATION_MODEL,
    contents: prompt,
  })

  return response.text || ""
}
