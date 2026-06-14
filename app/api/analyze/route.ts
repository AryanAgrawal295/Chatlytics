import { NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { retrieveAndRank } from "@/lib/retriever"
import { buildAnalysisPrompt } from "@/lib/promptBuilder"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
const gemini = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

export async function POST(req: NextRequest) {
  try {
    const { question, transcriptId, userId } = await req.json()

    if (!question || !transcriptId || !userId) {
      return NextResponse.json(
        { error: "question, transcriptId, and userId are required" },
        { status: 400 }
      )
    }

    // ── Step 1: Retrieve + re-rank relevant chunks ─────────────────────────
    const chunks = await retrieveAndRank(question, transcriptId, userId, 5)

    if (chunks.length === 0) {
      return NextResponse.json({
        answer: "No relevant conversation context found for this question. Please make sure the transcript was uploaded successfully.",
        chunksUsed: 0,
      })
    }

    // ── Step 2: Build grounded prompt with full signals ────────────────────
    const prompt = buildAnalysisPrompt(question, chunks)

    // ── Step 3: Generate answer ────────────────────────────────────────────
    const result = await gemini.generateContent(prompt)
    const answer = result.response.text()

    // ── Step 4: Return answer with debug metadata ──────────────────────────
    return NextResponse.json({
      answer,
      chunksUsed: chunks.length,
      debug: {
        topChunkSummaries: chunks.map((c) => c.topicSummary),
        emotionsInContext: [...new Set(chunks.map((c) => c.emotion))],
        intentsInContext: [...new Set(chunks.map((c) => c.intent))],
      },
    })
  } catch (error) {
    console.error("[ANALYZE ERROR]", error)
    return NextResponse.json(
      { error: "Failed to analyze transcript" },
      { status: 500 }
    )
  }
}
