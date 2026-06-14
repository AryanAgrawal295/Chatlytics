import mongoose, { Schema, models, model } from "mongoose"

const TranscriptSchema = new Schema(
  {
    transcriptId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    userId: {
      type: String,
      required: true,
      index: true,
    },
    rawText: {
      type: String,
      required: true,
    },
    chunkCount: {
      type: Number,
      required: true,
      min: 0,
    },
    fileName: {
      type: String,
      required: true,
      default: "pasted_transcript",
    },
  },
  {
    timestamps: true,
  }
)

export type TranscriptDocument = mongoose.InferSchemaType<typeof TranscriptSchema>

export const TranscriptModel =
  models.Transcript || model("Transcript", TranscriptSchema)
