import { NextRequest, NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"
import { applyChunkTags, semanticChunk } from "@/lib/chunker"
import { detectFileType, extractFileContent } from "@/lib/fileExtractors"
import { tagAllChunks } from "@/lib/tagger"
import { embedChunks } from "@/lib/embedder"
import { getPineconeIndex } from "@/lib/pinecone"
import { FileAttachmentModel } from "@/models/FileAttachment"
import { ChunkDraft } from "@/types/rag"
import mongoose from "mongoose"

async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI!)
  }
}

function buildFallbackFileChunk(
  transcriptId: string,
  userId: string,
  fileContext: string
): ChunkDraft {
  return {
    id: `${transcriptId}_chunk_0`,
    transcriptId,
    userId,
    text: fileContext,
    speakers: ["File Attachment"],
    dominantSpeaker: "File Attachment",
    turnIndex: 0,
    startLine: 0,
    endLine: 0,
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()

    const file = formData.get("file") as File | null
    const transcriptId = formData.get("transcriptId") as string
    const userId = formData.get("userId") as string
    const uploadedBy = (formData.get("uploadedBy") as string) || "customer"

    if (!file || !transcriptId || !userId) {
      return NextResponse.json(
        { error: "file, transcriptId, and userId are required" },
        { status: 400 }
      )
    }

    const mimeType = detectFileType(file.type, file.name)
    if (!mimeType) {
      return NextResponse.json(
        { error: `Unsupported file type: ${file.type}` },
        { status: 400 }
      )
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const { extractedText, summary } = await extractFileContent(
      buffer,
      mimeType,
      file.name
    )

    const fileContext = `
[FILE ATTACHMENT - ${file.name} - uploaded by ${uploadedBy}]
Summary: ${summary}

Extracted Content:
${extractedText}
[END OF ATTACHMENT]
`.trim()

    const chunkDrafts = semanticChunk(fileContext, transcriptId, userId)
    const finalChunkDrafts =
      chunkDrafts.length > 0
        ? chunkDrafts
        : [buildFallbackFileChunk(transcriptId, userId, fileContext)]

    const tags = await tagAllChunks(finalChunkDrafts.map((chunk) => chunk.text))
    const smartChunks = applyChunkTags(finalChunkDrafts, tags)

    const fileChunks = smartChunks.map((chunk) => ({
      ...chunk,
      id: `${transcriptId}_file_${uuidv4().slice(0, 8)}_${chunk.turnIndex}`,
    }))

    const embeddings = await embedChunks(
      fileChunks.map((chunk) => chunk.contextualText)
    )

    const index = getPineconeIndex()
    const vectors = fileChunks.map((chunk, i) => ({
      id: chunk.id,
      values: embeddings[i],
      metadata: {
        transcriptId,
        userId,
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
        sourceType: "file_attachment",
        fileName: file.name,
        uploadedBy,
      },
    }))

    const batchSize = 100
    for (let i = 0; i < vectors.length; i += batchSize) {
      await index.upsert(vectors.slice(i, i + batchSize))
    }

    await connectDB()
    const attachmentId = uuidv4()
    await FileAttachmentModel.create({
      attachmentId,
      transcriptId,
      userId,
      uploadedBy,
      fileType:
        mimeType.split("/")[0] === "image"
          ? "image"
          : mimeType.includes("pdf")
            ? "pdf"
            : mimeType.includes("csv")
              ? "csv"
              : "excel",
      originalName: file.name,
      extractedText,
      summary,
    })

    return NextResponse.json({
      success: true,
      attachmentId,
      fileName: file.name,
      summary,
      chunksCreated: fileChunks.length,
    })
  } catch (error) {
    console.error("[INGEST-FILE ERROR]", error)
    return NextResponse.json(
      { error: "Failed to process file" },
      { status: 500 }
    )
  }
}
