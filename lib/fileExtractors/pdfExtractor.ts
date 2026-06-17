import { GoogleGenerativeAI } from "@google/generative-ai"
import { ExtractedFile } from "./imageExtractor"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })

async function summarize(text: string): Promise<string> {
  try {
    const result = await model.generateContent(
      `Summarize what this document contains in one sentence: "${text.slice(0, 800)}". Only respond with the summary sentence.`
    )
    return result.response.text().trim()
  } catch {
    return "PDF document"
  }
}

export async function extractFromPDF(buffer: Buffer): Promise<ExtractedFile> {
  try {
    // Skip pdf-parse entirely — use Gemini Vision directly on the PDF buffer
    // Gemini 1.5 Flash natively reads PDFs as documents
    const base64 = buffer.toString("base64")

    const result = await model.generateContent([
      {
        inlineData: {
          mimeType: "application/pdf",
          data: base64,
        },
      },
      {
        text: `Extract ALL text content from this PDF document.
Then provide:
1. EXTRACTED TEXT: (all readable text)
2. SUMMARY: (one sentence describing what this document is about)`,
      },
    ])

    const fullText = result.response.text()
    const summaryMatch = fullText.match(/SUMMARY:\s*(.+?)(?:\n|$)/i)
    const summary = summaryMatch?.[1]?.trim() ?? await summarize(fullText)

    return { extractedText: fullText, summary }
  } catch (error) {
    console.error("[PDF EXTRACTOR ERROR]", error)
    return {
      extractedText: "Could not extract content from PDF",
      summary: "PDF — extraction failed",
    }
  }
}