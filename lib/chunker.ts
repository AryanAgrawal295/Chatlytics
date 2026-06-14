import { v4 as uuidv4 } from "uuid"
import { SmartChunk } from "@/types/rag"
import { ChunkTags } from "./tagger"

// Matches: "John: text", "[10:32] Alice: text",
// "[16/06/25, 11:08:40 PM] Aryan Agrawal: text", "+91 99999 99999: text"
const SPEAKER_REGEX = /^(?:\[[^\]]+\]\s*)?([^:\n]{1,80}):\s*(.+)$/

type ParsedLine = {
  speaker: string
  text: string
  lineIndex: number
}

// ── 1. Parse raw transcript into speaker-attributed lines ──────────────────
export function parseLines(transcript: string): ParsedLine[] {
  const raw = transcript.split("\n").map((l) => l.trim()).filter(Boolean)
  const lines: ParsedLine[] = []

  for (let i = 0; i < raw.length; i++) {
    const match = raw[i].match(SPEAKER_REGEX)
    if (match) {
      lines.push({
        speaker: match[1].trim(),
        text: match[2].trim(),
        lineIndex: i,
      })
    } else if (lines.length > 0) {
      // Continuation line — append to last speaker
      lines[lines.length - 1].text += " " + raw[i]
    }
  }

  return lines
}

// ── 2. Detect topic/intent boundaries ─────────────────────────────────────
// A new chunk starts when:
//   (a) Speaker switches back and forth 3+ times (new conversational thread)
//   (b) Chunk has grown past 600 chars AND speaker just changed
//   (c) A hard boundary keyword appears (signals topic shift)
const BOUNDARY_KEYWORDS = [
  "anyway", "moving on", "next", "another issue", "also wanted",
  "separate question", "by the way", "actually", "on a different note",
  "regarding", "about the", "one more thing", "additionally"
]

function isBoundary(
  lines: ParsedLine[],
  currentIndex: number,
  currentChunkText: string,
  speakerSwitches: number
): boolean {
  if (currentIndex === 0) return false

  const line = lines[currentIndex]
  const prevLine = lines[currentIndex - 1]

  // Hard boundary: keyword detected
  const hasKeyword = BOUNDARY_KEYWORDS.some((kw) =>
    line.text.toLowerCase().startsWith(kw)
  )
  if (hasKeyword) return true

  // Size + speaker switch boundary
  const isLongEnough = currentChunkText.length > 600
  const speakerChanged = line.speaker !== prevLine.speaker
  if (isLongEnough && speakerChanged) return true

  // Too many back-and-forths = natural arc completed
  if (speakerSwitches >= 6 && speakerChanged) return true

  // Hard max size
  if (currentChunkText.length > 1200) return true

  return false
}

// ── 3. Build contextual prefix from previous chunks ────────────────────────
// This is the KEY to contextual embedding:
// Each chunk's embedding carries what happened BEFORE it
function buildContextPrefix(previousChunks: string[]): string {
  if (previousChunks.length === 0) return ""

  // Use last 2 chunk summaries as rolling context
  const recent = previousChunks.slice(-2)
  return `[CONVERSATION CONTEXT SO FAR: ${recent.join(" → ")}]\n\n`
}

// ── 4. Main chunker ────────────────────────────────────────────────────────
export function semanticChunk(
  transcript: string,
  transcriptId: string,
  userId: string,
  tags: ChunkTags[]  // from tagger.ts — one tag per chunk
): SmartChunk[] {
  const lines = parseLines(transcript)
  const chunks: SmartChunk[] = []
  const previousSummaries: string[] = []

  let bufferLines: ParsedLine[] = []
  let speakerSwitches = 0
  let lastSpeaker = ""
  let chunkIndex = 0

  const flushChunk = () => {
    if (bufferLines.length === 0) return

    const text = bufferLines
      .map((l) => `${l.speaker}: ${l.text}`)
      .join("\n")

    const speakers = [...new Set(bufferLines.map((l) => l.speaker))]
    const dominantSpeaker = speakers[0] // first speaker = conversation initiator

    // Get tags for this chunk (fall back to defaults if index out of bounds)
    const tag = tags[chunkIndex] || {
      intent: "unknown" as const,
      emotion: "neutral" as const,
      topicSummary: "Conversation segment",
      isResolutionPresent: false,
      isEscalation: false,
    }

    // Build contextual text = history prefix + current chunk
    // THIS is what gets embedded — not just raw text
    const contextPrefix = buildContextPrefix(previousSummaries)
    const contextualText = `${contextPrefix}[CURRENT SEGMENT - Intent: ${tag.intent}, Emotion: ${tag.emotion}]\n${text}`

    chunks.push({
      id: `${transcriptId}_chunk_${chunkIndex}`,
      transcriptId,
      userId,
      text,
      contextualText,
      speakers,
      dominantSpeaker,
      turnIndex: chunkIndex,
      startLine: bufferLines[0].lineIndex,
      endLine: bufferLines[bufferLines.length - 1].lineIndex,
      intent: tag.intent,
      emotion: tag.emotion,
      topicSummary: tag.topicSummary,
      isResolutionPresent: tag.isResolutionPresent,
      isEscalation: tag.isEscalation,
    })

    // Add this chunk's summary to rolling context for next chunk
    previousSummaries.push(tag.topicSummary)
    bufferLines = []
    speakerSwitches = 0
    lastSpeaker = ""
    chunkIndex++
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const currentText = bufferLines.map((l) => `${l.speaker}: ${l.text}`).join("\n")

    if (isBoundary(lines, i, currentText, speakerSwitches)) {
      flushChunk()
    }

    if (line.speaker !== lastSpeaker) {
      speakerSwitches++
      lastSpeaker = line.speaker
    }

    bufferLines.push(line)
  }

  flushChunk() // flush remaining lines

  return chunks
}
