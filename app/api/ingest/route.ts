import { NextRequest, NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"
import { parseLines, semanticChunk } from "@/lib/chunker"
import { tagAllChunks } from "@/lib/tagger"
import { embedChunks } from "@/lib/embedder"
import { getPineconeIndex } from "@/lib/pinecone"
import { TranscriptModel } from "@/models/Transcript"
import mongoose from "mongoose"

async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI!, {
      serverSelectionTimeoutMS: 5000,
    })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { transcript, userId, fileName } = await req.json()

    if (!transcript || !userId) {
      return NextResponse.json(
        { error: "transcript and userId are required" },
        { status: 400 }
      )
    }

    const transcriptId = uuidv4()

    // ── Phase 1: Pre-chunk to get raw text blocks for tagging ─────────────
    // We do a rough split first to tag, then proper semantic chunk with tags
    const lines = parseLines(transcript)
    if (lines.length === 0) {
      return NextResponse.json(
        {
          error:
            "No speaker-attributed chat lines were found. Use lines like 'Customer: message' or '[date, time] Name: message'.",
        },
        { status: 400 }
      )
    }

    const roughChunks: string[] = []
    let buffer = ""

    for (const line of lines) {
      buffer += `${line.speaker}: ${line.text}\n`
      if (buffer.length > 500) {
        roughChunks.push(buffer.trim())
        buffer = ""
      }
    }
    if (buffer.trim()) roughChunks.push(buffer.trim())

    // ── Phase 2: Tag all rough chunks (emotion, intent, summary) ──────────
    console.log(`[INGEST] Tagging ${roughChunks.length} chunks...`)
    const tags = await tagAllChunks(roughChunks)

    // ── Phase 3: Semantic chunking with tags ──────────────────────────────
    const smartChunks = semanticChunk(transcript, transcriptId, userId, tags)
    console.log(`[INGEST] Created ${smartChunks.length} smart chunks`)

    // ── Phase 4: Contextual embedding ─────────────────────────────────────
    // We embed contextualText (history prefix + tags + raw text)
    // NOT just raw text — this is what makes retrieval context-aware
    console.log(`[INGEST] Embedding ${smartChunks.length} chunks...`)
    const embeddings = await embedChunks(
      smartChunks.map((c) => c.contextualText)
    )

    // ── Phase 5: Upsert vectors with full metadata ────────────────────────
    const vectors = smartChunks.map((chunk, i) => ({
      id: chunk.id,
      values: embeddings[i],
      metadata: {
        transcriptId: chunk.transcriptId,
        userId: chunk.userId,
        text: chunk.text,                        // raw text for display
        contextualText: chunk.contextualText,    // full contextual text
        speakers: chunk.speakers,
        dominantSpeaker: chunk.dominantSpeaker,
        turnIndex: chunk.turnIndex,
        intent: chunk.intent,
        emotion: chunk.emotion,
        topicSummary: chunk.topicSummary,
        isResolutionPresent: chunk.isResolutionPresent,
        isEscalation: chunk.isEscalation,
      },
    }))

    const index = getPineconeIndex()
    const BATCH = 100
    for (let i = 0; i < vectors.length; i += BATCH) {
      await index.upsert(vectors.slice(i, i + BATCH))
    }

    // ── Phase 6: Save metadata to MongoDB ─────────────────────────────────
    // Local previews should still be able to analyze after vectors are stored,
    // even when Atlas rejects the developer machine's current IP.
    let metadataWarning: string | undefined
    try {
      await connectDB()
      await TranscriptModel.create({
        transcriptId,
        userId,
        rawText: transcript,
        chunkCount: smartChunks.length,
        fileName: fileName || "pasted_transcript",
      })
    } catch (error) {
      metadataWarning =
        "Transcript vectors were stored, but MongoDB metadata was not saved."
      console.warn("[INGEST METADATA WARNING]", error)
    }

    return NextResponse.json({
      success: true,
      transcriptId,
      chunkCount: smartChunks.length,
      emotionsDetected: [...new Set(smartChunks.map((c) => c.emotion))],
      intentsDetected: [...new Set(smartChunks.map((c) => c.intent))],
      warning: metadataWarning,
    })
  } catch (error) {
    console.error("[INGEST ERROR]", error)
    return NextResponse.json(
      { error: "Failed to ingest transcript" },
      { status: 500 }
    )
  }
}
