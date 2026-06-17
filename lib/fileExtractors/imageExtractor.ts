import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })

export type ExtractedFile = {
  extractedText: string
  summary: string
}

// Converts image buffer to base64 and sends to Gemini Vision
export async function extractFromImage(
  buffer: Buffer,
  mimeType: "image/jpeg" | "image/png" | "image/webp"
): Promise<ExtractedFile> {
  const base64 = buffer.toString("base64")

  const prompt = `
You are analyzing an image uploaded in a customer support conversation.
Extract ALL meaningful information from this image.

If it is a bill or invoice, extract:
- Vendor/company name
- Invoice/bill number
- Date
- All line items with amounts
- Subtotal, taxes, total amount
- Payment status if visible

If it is a receipt, extract:
- Store name, date, time
- All purchased items and prices
- Total amount paid

If it is an error screenshot, extract:
- Exact error message text
- App or page name
- Any error codes visible

If it is a product image, describe:
- Product name/type
- Visible condition
- Any defects or issues visible

If it is a document or form, extract all text content.

After extraction, provide:
1. EXTRACTED DATA: (all structured data from above)
2. SUMMARY: (one sentence describing what this file contains)

Be thorough — every number and detail matters.
`.trim()

  const result = await model.generateContent([
    {
      inlineData: {
        mimeType,
        data: base64,
      },
    },
    { text: prompt },
  ])

  const fullText = result.response.text()

  // Split extracted data from summary
  const summaryMatch = fullText.match(/SUMMARY:\s*(.+?)(?:\n|$)/i)
  const summary = summaryMatch
    ? summaryMatch[1].trim()
    : "Image file with extracted content"

  return {
    extractedText: fullText,
    summary,
  }
}