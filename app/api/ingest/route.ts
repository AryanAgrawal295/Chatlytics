import { NextRequest, NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"
import { applyChunkTags, parseLines, semanticChunk } from "@/lib/chunker"
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

    const chunkDrafts = semanticChunk(transcript, transcriptId, userId)
    console.log(`[INGEST] Created ${chunkDrafts.length} final chunks`)

    console.log(`[INGEST] Tagging ${chunkDrafts.length} final chunks...`)
    const tags = await tagAllChunks(chunkDrafts.map((chunk) => chunk.text))

    const smartChunks = applyChunkTags(chunkDrafts, tags)
    console.log(`[INGEST] Built ${smartChunks.length} tagged chunks`)

    console.log(`[INGEST] Embedding ${smartChunks.length} chunks...`)
    const embeddings = await embedChunks(
      smartChunks.map((chunk) => chunk.contextualText)
    )

    const vectors = smartChunks.map((chunk, i) => ({
      id: chunk.id,
      values: embeddings[i],
      metadata: {
        transcriptId: chunk.transcriptId,
        userId: chunk.userId,
        text: chunk.text,
        contextualText: chunk.contextualText,
        speakers: chunk.speakers,
        dominantSpeaker: chunk.dominantSpeaker,
        turnIndex: chunk.turnIndex,
        startLine: chunk.startLine,
        endLine: chunk.endLine,
        intent: chunk.intent,
        emotion: chunk.emotion,
        topicSummary: chunk.topicSummary,
        isResolutionPresent: chunk.isResolutionPresent,
        isEscalation: chunk.isEscalation,
      },
    }))

    const index = getPineconeIndex()
    const batchSize = 100
    for (let i = 0; i < vectors.length; i += batchSize) {
      await index.upsert(vectors.slice(i, i + batchSize))
    }

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
      emotionsDetected: [...new Set(smartChunks.map((chunk) => chunk.emotion))],
      intentsDetected: [...new Set(smartChunks.map((chunk) => chunk.intent))],
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
