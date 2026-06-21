import { GoogleGenAI } from "@google/genai"

export const GEMINI_GENERATION_MODEL =
  process.env.GEMINI_GENERATION_MODEL || "gemini-2.5-flash"

const GEMINI_FALLBACK_MODELS = (
  process.env.GEMINI_FALLBACK_MODELS || "gemini-2.5-flash-lite"
)
  .split(",")
  .map((model) => model.trim())
  .filter(Boolean)

export const geminiAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
})

export async function generateText(
  prompt: string,
  options: { temperature?: number } = {}
): Promise<string> {
  const models = [...new Set([GEMINI_GENERATION_MODEL, ...GEMINI_FALLBACK_MODELS])]
  let lastError: unknown

  for (const model of models) {
    try {
      const response = await geminiAI.models.generateContent({
        model,
        contents: prompt,
        config: {
          temperature: options.temperature ?? 0.4,
        },
      })

      return response.text || ""
    } catch (error) {
      lastError = error
      const status = (error as { status?: number }).status
      if (status !== 429 && status !== 404) throw error
      console.warn(`[GEMINI WARNING] ${model} unavailable; trying next model`)
    }
  }

  throw lastError
}
