import { RetrievedChunk } from "@/types/rag"

export function buildAnalysisPrompt(
  question: string,
  chunks: RetrievedChunk[]
): string {
  // Sort chunks by their position in conversation for natural flow
  const ordered = [...chunks].sort((a, b) => a.turnIndex - b.turnIndex)

  // Build emotion and intent summary for the prompt header
  const emotions = [...new Set(ordered.map((c) => c.emotion))].join(", ")
  const intents = [...new Set(ordered.map((c) => c.intent))].join(", ")
  const hasResolution = ordered.some((c) => c.isResolutionPresent)
  const hasEscalation = ordered.some((c) => c.isEscalation)

  // Build the context block with rich metadata per chunk
  const contextBlock = ordered
    .map((c, i) => {
      const speakers = c.speakers.join(" & ")
      return `
--- Segment ${i + 1} [Intent: ${c.intent} | Emotion: ${c.emotion} | Speakers: ${speakers}] ---
Summary: ${c.topicSummary}
${c.text}
${c.isResolutionPresent ? "✓ Resolution was offered in this segment." : ""}
${c.isEscalation ? "⚠ Escalation detected in this segment." : ""}
`.trim()
    })
    .join("\n\n")

  return `
You are Chatlytics, a conversational intelligence AI specialized in analyzing customer-agent chat transcripts.

Your job: Answer the user's question using ONLY the conversation segments provided below.
Never invent details. If something isn't in the context, say so clearly.

CONVERSATION INTELLIGENCE SIGNALS:
- Emotions detected across segments: ${emotions}
- Conversation intents detected: ${intents}
- Resolution present: ${hasResolution ? "Yes" : "No"}
- Escalation detected: ${hasEscalation ? "Yes" : "No"}

RETRIEVED CONVERSATION SEGMENTS:
${contextBlock}

USER QUESTION: ${question}

Instructions for your answer:
1. Ground every claim in the segments above
2. Mention speaker names when relevant (e.g. "The customer expressed...")
3. Note emotional signals if they're relevant to the question
4. If a resolution or escalation was detected, address it
5. Be concise but complete — no filler sentences
6. Start directly with the answer. Never begin with "Based on the provided conversation segments" or a similar preface
`.trim()
}
