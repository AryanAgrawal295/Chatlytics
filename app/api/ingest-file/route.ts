import { NextRequest, NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"
import { detectFileType, extractFileContent } from "@/lib/fileExtractors"
import { FileAttachmentModel } from "@/models/FileAttachment"
// import { chunkTranscript } from "@/lib/chunker"
import { tagAllChunks } from "@/lib/tagger"
import { semanticChunk, parseLines } from "@/lib/chunker"
import { embedChunks } from "@/lib/embedder"
import { getPineconeIndex } from "@/lib/pinecone"
import mongoose from "mongoose"

async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI!)
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

    // ── Step 1: Detect file type ───────────────────────────────────────────
    const mimeType = detectFileType(file.type, file.name)
    if (!mimeType) {
      return NextResponse.json(
        { error: `Unsupported file type: ${file.type}` },
        { status: 400 }
      )
    }

    // ── Step 2: Convert File to Buffer ─────────────────────────────────────
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // ── Step 3: Extract content using the right extractor ─────────────────
    const { extractedText, summary } = await extractFileContent(
      buffer,
      mimeType,
      file.name
    )

    // ── Step 4: Format extracted text as a transcript-style context block ──
    // This is how file content becomes part of the RAG pipeline:
    // we label it clearly so Gemini knows it came from an attached file
    const fileContext = `
[FILE ATTACHMENT — ${file.name} — uploaded by ${uploadedBy}]
Summary: ${summary}

Extracted Content:
${extractedText}
[END OF ATTACHMENT]
`.trim()

    // ── Step 5: Run through existing RAG pipeline ──────────────────────────
    // File content treated exactly like transcript text from here on
    const lines = parseLines(fileContext)
    const roughChunks: string[] = []
    let buffer2 = ""

    for (const line of lines) {
      buffer2 += `${line.speaker}: ${line.text}\n`
      if (buffer2.length > 500) {
        roughChunks.push(buffer2.trim())
        buffer2 = ""
      }
    }

    // If file content doesn't follow speaker format, chunk as single block
    if (roughChunks.length === 0) {
      roughChunks.push(fileContext)
    }
    if (buffer2.trim()) roughChunks.push(buffer2.trim())

    const tags = await tagAllChunks(roughChunks)
    const smartChunks = semanticChunk(fileContext, transcriptId, userId, tags)

    // Tag each chunk with file source for retrieval transparency
    const fileChunks = smartChunks.map((c) => ({
      ...c,
      id: `${transcriptId}_file_${uuidv4().slice(0, 8)}_${c.turnIndex}`,
    }))

    const embeddings = await embedChunks(
      fileChunks.map((c) => c.contextualText)
    )

    // ── Step 6: Upsert file chunks to Pinecone ─────────────────────────────
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
        intent: chunk.intent,
        emotion: chunk.emotion,
        topicSummary: chunk.topicSummary,
        isResolutionPresent: chunk.isResolutionPresent,
        isEscalation: chunk.isEscalation,
        // Extra metadata for file chunks
        sourceType: "file_attachment",
        fileName: file.name,
        uploadedBy,
      },
    }))

    const BATCH = 100
    for (let i = 0; i < vectors.length; i += BATCH) {
      await index.upsert(vectors.slice(i, i + BATCH))
    }

    // ── Step 7: Save attachment metadata to MongoDB ────────────────────────
    await connectDB()
    const attachmentId = uuidv4()
    await FileAttachmentModel.create({
      attachmentId,
      transcriptId,
      userId,
      uploadedBy,
      fileType: mimeType.split("/")[0] === "image" ? "image"
        : mimeType.includes("pdf") ? "pdf"
        : mimeType.includes("csv") ? "csv" : "excel",
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