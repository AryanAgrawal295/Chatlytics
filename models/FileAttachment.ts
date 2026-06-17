import mongoose, { Schema, Document } from "mongoose"

export type FileType = "image" | "pdf" | "excel" | "csv"

export interface IFileAttachment extends Document {
  attachmentId: string
  transcriptId: string      // links to parent transcript session
  userId: string
  uploadedBy: "customer" | "agent"
  fileType: FileType
  originalName: string
  extractedText: string     // what Gemini/parser pulled out
  summary: string           // 1-sentence summary of file content
  createdAt: Date
}

const FileAttachmentSchema = new Schema<IFileAttachment>({
  attachmentId:  { type: String, required: true, unique: true },
  transcriptId:  { type: String, required: true },
  userId:        { type: String, required: true },
  uploadedBy:    { type: String, enum: ["customer", "agent"], required: true },
  fileType:      { type: String, enum: ["image", "pdf", "excel", "csv"] },
  originalName:  { type: String },
  extractedText: { type: String },
  summary:       { type: String },
  createdAt:     { type: Date, default: Date.now },
})

FileAttachmentSchema.index({ transcriptId: 1 })

export const FileAttachmentModel =
  mongoose.models.FileAttachment ||
  mongoose.model<IFileAttachment>("FileAttachment", FileAttachmentSchema)