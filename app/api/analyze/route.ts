import { NextRequest, NextResponse } from "next/server"
import { retrieveAndRank } from "@/lib/retriever"
import { buildAnalysisPrompt } from "@/lib/promptBuilder"
import { generateText } from "@/lib/gemini"
import { verifyAnswerAgainstEvidence } from "@/lib/answerVerifier"
import { Citation, RetrievedChunk } from "@/types/rag"

function cleanAnswerPrefix(answer: string): string {
  return answer
    .trim()
    .replace(
      /^based on (?:the )?(?:provided )?(?:conversation )?(?:segments|context)(?: provided)?\s*[:,.-]?\s*/i,
      ""
    )
}

function buildCitations(chunks: RetrievedChunk[]): Citation[] {
  return [...chunks]
    .sort((a, b) => a.turnIndex - b.turnIndex)
    .map((chunk, index) => ({
      segment: index + 1,
      summary: chunk.topicSummary,
      excerpt: chunk.text.slice(0, 260),
      speakers: chunk.speakers,
      startLine: chunk.startLine,
      endLine: chunk.endLine,
      intent: chunk.intent,
      emotion: chunk.emotion,
    }))
}

export async function POST(req: NextRequest) {
  try {
    const { question, transcriptId, userId } = await req.json()

    if (!question || !transcriptId || !userId) {
      return NextResponse.json(
        { error: "question, transcriptId, and userId are required" },
        { status: 400 }
      )
    }

    const chunks = await retrieveAndRank(question, transcriptId, userId, 5)

    if (chunks.length === 0) {
      return NextResponse.json({
        answer:
          "No relevant conversation context found for this question. Please make sure the transcript was uploaded successfully.",
        chunksUsed: 0,
        citations: [],
      })
    }

    const prompt = buildAnalysisPrompt(question, chunks)
    const draftAnswer = cleanAnswerPrefix(await generateText(prompt))
    const verification = await verifyAnswerAgainstEvidence(
      question,
      draftAnswer,
      chunks
    )
    const answer =
      cleanAnswerPrefix(verification.correctedAnswer) ||
      "The retrieved conversation context does not contain enough supported evidence to answer this question."
    const citations = buildCitations(chunks)

    return NextResponse.json({
      answer,
      chunksUsed: chunks.length,
      citations,
      verification: {
        isSupported: verification.isSupported,
        unsupportedClaims: verification.unsupportedClaims,
      },
      debug: {
        topChunkSummaries: chunks.map((chunk) => chunk.topicSummary),
        emotionsInContext: [...new Set(chunks.map((chunk) => chunk.emotion))],
        intentsInContext: [...new Set(chunks.map((chunk) => chunk.intent))],
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
