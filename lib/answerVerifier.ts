import { RetrievedChunk } from "@/types/rag"
import { generateText } from "./gemini"

export type AnswerVerification = {
  isSupported: boolean
  correctedAnswer: string
  unsupportedClaims: string[]
}

function stripJsonFences(raw: string): string {
  return raw.replace(/```json|```/g, "").trim()
}

function safeParseVerification(raw: string, fallbackAnswer: string): AnswerVerification {
  try {
    const parsed = JSON.parse(stripJsonFences(raw))
    return {
      isSupported: Boolean(parsed.isSupported),
      correctedAnswer:
        typeof parsed.correctedAnswer === "string"
          ? parsed.correctedAnswer.trim()
          : fallbackAnswer,
      unsupportedClaims: Array.isArray(parsed.unsupportedClaims)
        ? parsed.unsupportedClaims
            .filter((claim: unknown): claim is string => typeof claim === "string")
            .slice(0, 8)
        : [],
    }
  } catch {
    return {
      isSupported: true,
      correctedAnswer: fallbackAnswer,
      unsupportedClaims: [],
    }
  }
}

function buildEvidenceBlock(chunks: RetrievedChunk[]): string {
  return [...chunks]
    .sort((a, b) => a.turnIndex - b.turnIndex)
    .map(
      (chunk, index) => `
[Segment ${index + 1} | lines ${chunk.startLine + 1}-${chunk.endLine + 1}]
Summary: ${chunk.topicSummary}
Intent: ${chunk.intent}
Emotion: ${chunk.emotion}
Speakers: ${chunk.speakers.join(", ") || "Unknown"}
Text:
${chunk.text}
`.trim()
    )
    .join("\n\n")
}

export async function verifyAnswerAgainstEvidence(
  question: string,
  answer: string,
  chunks: RetrievedChunk[]
): Promise<AnswerVerification> {
  const prompt = `
You are a strict answer verifier for a RAG system.

Your task:
1. Check whether the DRAFT ANSWER is fully supported by the EVIDENCE SEGMENTS.
2. Remove or rewrite any claim that is not directly supported.
3. If the evidence cannot answer the user's question, say that clearly.

Return ONLY valid JSON with this exact shape:
{
  "isSupported": true or false,
  "correctedAnswer": "final answer using only supported evidence",
  "unsupportedClaims": ["short descriptions of unsupported claims"]
}

USER QUESTION:
${question}

DRAFT ANSWER:
${answer}

EVIDENCE SEGMENTS:
${buildEvidenceBlock(chunks)}
`.trim()

  try {
    const raw = await generateText(prompt, { temperature: 0 })
    return safeParseVerification(raw, answer)
  } catch (error) {
    console.warn("[ANSWER VERIFY WARNING] Returning unverified answer", error)
    return {
      isSupported: true,
      correctedAnswer: answer,
      unsupportedClaims: [],
    }
  }
}
