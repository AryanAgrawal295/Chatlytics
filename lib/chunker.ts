import { ChunkDraft, SmartChunk } from "@/types/rag"
import { ChunkTags } from "./tagger"

const SPEAKER_REGEX = /^(?:\[[^\]]+\]\s*)?([^:\n]{1,80}):\s*(.+)$/

const BOUNDARY_KEYWORDS = [
  "anyway",
  "moving on",
  "next",
  "another issue",
  "also wanted",
  "separate question",
  "by the way",
  "actually",
  "on a different note",
  "regarding",
  "about the",
  "one more thing",
  "additionally",
]

const RESOLUTION_HINTS = [
  "resolved",
  "fixed",
  "working now",
  "issue is solved",
  "thank you",
  "thanks",
  "perfect",
  "great",
  "done",
  "closed",
]

type ParsedLine = {
  speaker: string
  text: string
  lineIndex: number
}

function normalizeWhitespace(value: string): string {
  return value
    .replace(/\uFEFF/g, "")
    .replace(/[\u200B-\u200D\u2060]/g, "")
    .replace(/\r\n?/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
}

function normalizeSpeakerName(value: string): string {
  return value
    .replace(/\s+/g, " ")
    .replace(/[‎‏]/g, "")
    .trim()
}

function normalizeMessageText(value: string): string {
  return value.replace(/\s+/g, " ").trim()
}

function isSystemLikeLine(value: string): boolean {
  const normalized = value.toLowerCase().trim()
  return (
    /messages and calls are end-to-end encrypted/.test(normalized) ||
    /\bsecurity code changed\b/.test(normalized) ||
    /\bcreated this group\b/.test(normalized) ||
    /\bchanged the subject\b/.test(normalized) ||
    /\bchanged this group\b/.test(normalized) ||
    /\bjoined using this group's invite link\b/.test(normalized) ||
    /\bmissed (voice|video) call\b/.test(normalized) ||
    /\bthis message was deleted\b/.test(normalized) ||
    /\byou deleted this message\b/.test(normalized) ||
    /^<media omitted>$/i.test(normalized)
  )
}

export function normalizeTranscript(transcript: string): string {
  const normalized = normalizeWhitespace(transcript)
  if (!normalized) return ""

  return normalized
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((line) => !isSystemLikeLine(line))
    .join("\n")
}

export function parseLines(transcript: string): ParsedLine[] {
  const normalizedTranscript = normalizeTranscript(transcript)
  const raw = normalizedTranscript
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)

  const lines: ParsedLine[] = []
  const speakerAliases = new Map<string, string>()

  for (let i = 0; i < raw.length; i++) {
    const match = raw[i].match(SPEAKER_REGEX)
    if (match) {
      const rawSpeaker = normalizeSpeakerName(match[1])
      const canonicalSpeakerKey = rawSpeaker.toLowerCase()
      const speaker =
        speakerAliases.get(canonicalSpeakerKey) ||
        rawSpeaker ||
        "Unknown Speaker"
      if (!speakerAliases.has(canonicalSpeakerKey)) {
        speakerAliases.set(canonicalSpeakerKey, speaker)
      }

      const text = normalizeMessageText(match[2])
      if (!text || isSystemLikeLine(text)) continue

      lines.push({
        speaker,
        text,
        lineIndex: i,
      })
    } else if (lines.length > 0) {
      const continuation = normalizeMessageText(raw[i])
      if (continuation && !isSystemLikeLine(continuation)) {
        lines[lines.length - 1].text += ` ${continuation}`
      }
    }
  }

  return lines
}

function hasResolutionSignal(text: string): boolean {
  const normalized = text.toLowerCase()
  return RESOLUTION_HINTS.some((hint) => normalized.includes(hint))
}

function isBoundary(
  lines: ParsedLine[],
  currentIndex: number,
  currentChunkText: string,
  speakerSwitches: number,
  currentChunkLineCount: number
): boolean {
  if (currentIndex === 0) return false

  const line = lines[currentIndex]
  const prevLine = lines[currentIndex - 1]
  const speakerChanged = line.speaker !== prevLine.speaker
  const normalizedText = line.text.toLowerCase()

  if (
    currentChunkLineCount >= 3 &&
    BOUNDARY_KEYWORDS.some((keyword) => normalizedText.startsWith(keyword))
  ) {
    return true
  }

  const hasResolution = hasResolutionSignal(currentChunkText)
  if (
    currentChunkText.length > 900 &&
    speakerChanged &&
    currentChunkLineCount >= 4 &&
    !hasResolution
  ) {
    return true
  }

  if (
    speakerSwitches >= 8 &&
    speakerChanged &&
    currentChunkLineCount >= 5 &&
    !hasResolution
  ) {
    return true
  }

  if (currentChunkText.length > 1500) return true

  return false
}

function buildContextPrefix(previousSummaries: string[]): string {
  if (previousSummaries.length === 0) return ""

  const recent = previousSummaries.slice(-2)
  return `[CONVERSATION CONTEXT SO FAR: ${recent.join(" -> ")}]\n\n`
}

function mergeSmallAdjacentChunks(chunks: ChunkDraft[]): ChunkDraft[] {
  if (chunks.length <= 1) return chunks

  const merged: ChunkDraft[] = []

  for (const chunk of chunks) {
    const previous = merged[merged.length - 1]
    const isSmallChunk =
      chunk.text.length < 180 || chunk.text.split("\n").length <= 2

    if (previous && isSmallChunk) {
      previous.text = `${previous.text}\n${chunk.text}`
      previous.speakers = [...new Set([...previous.speakers, ...chunk.speakers])]
      previous.endLine = chunk.endLine
      continue
    }

    merged.push({ ...chunk, speakers: [...chunk.speakers] })
  }

  return merged.map((chunk, index) => ({
    ...chunk,
    id: `${chunk.transcriptId}_chunk_${index}`,
    turnIndex: index,
  }))
}

export function semanticChunk(
  transcript: string,
  transcriptId: string,
  userId: string
): ChunkDraft[] {
  const lines = parseLines(transcript)
  const chunks: ChunkDraft[] = []

  let bufferLines: ParsedLine[] = []
  let speakerSwitches = 0
  let lastSpeaker = ""
  let chunkIndex = 0

  const flushChunk = () => {
    if (bufferLines.length === 0) return

    const text = bufferLines
      .map((line) => `${line.speaker}: ${line.text}`)
      .join("\n")

    const speakers = [...new Set(bufferLines.map((line) => line.speaker))]
    const dominantSpeaker = speakers[0]

    chunks.push({
      id: `${transcriptId}_chunk_${chunkIndex}`,
      transcriptId,
      userId,
      text,
      speakers,
      dominantSpeaker,
      turnIndex: chunkIndex,
      startLine: bufferLines[0].lineIndex,
      endLine: bufferLines[bufferLines.length - 1].lineIndex,
    })

    bufferLines = []
    speakerSwitches = 0
    lastSpeaker = ""
    chunkIndex++
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const currentText = bufferLines
      .map((bufferLine) => `${bufferLine.speaker}: ${bufferLine.text}`)
      .join("\n")

    if (
      isBoundary(
        lines,
        i,
        currentText,
        speakerSwitches,
        bufferLines.length
      )
    ) {
      flushChunk()
    }

    if (line.speaker !== lastSpeaker) {
      speakerSwitches++
      lastSpeaker = line.speaker
    }

    bufferLines.push(line)
  }

  flushChunk()

  return mergeSmallAdjacentChunks(chunks)
}

export function applyChunkTags(
  chunks: ChunkDraft[],
  tags: ChunkTags[]
): SmartChunk[] {
  const previousSummaries: string[] = []

  return chunks.map((chunk, index) => {
    const tag = tags[index] || {
      intent: "unknown" as const,
      emotion: "neutral" as const,
      topicSummary: "Conversation segment",
      isResolutionPresent: false,
      isEscalation: false,
    }

    const contextPrefix = buildContextPrefix(previousSummaries)
    const contextualText =
      `${contextPrefix}[CURRENT SEGMENT - Intent: ${tag.intent}, Emotion: ${tag.emotion}]\n${chunk.text}`

    previousSummaries.push(tag.topicSummary)

    return {
      ...chunk,
      contextualText,
      intent: tag.intent,
      emotion: tag.emotion,
      topicSummary: tag.topicSummary,
      isResolutionPresent: tag.isResolutionPresent,
      isEscalation: tag.isEscalation,
    }
  })
}
