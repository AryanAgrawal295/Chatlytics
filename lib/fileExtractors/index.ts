import { extractFromImage, ExtractedFile } from "./imageExtractor"
import { extractFromPDF } from "./pdfExtractor"
import { extractFromExcel, extractFromCSV } from "./excelExtractor"

export type SupportedMimeType =
  | "image/jpeg"
  | "image/png"
  | "image/webp"
  | "application/pdf"
  | "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  | "application/vnd.ms-excel"
  | "text/csv"

export function detectFileType(
  mimeType: string,
  fileName: string
): SupportedMimeType | null {
  const ext = fileName.split(".").pop()?.toLowerCase()

  if (mimeType.includes("jpeg") || ext === "jpg" || ext === "jpeg")
    return "image/jpeg"
  if (mimeType.includes("png") || ext === "png") return "image/png"
  if (mimeType.includes("webp") || ext === "webp") return "image/webp"
  if (mimeType.includes("pdf") || ext === "pdf") return "application/pdf"
  if (mimeType.includes("csv") || ext === "csv") return "text/csv"
  if (
    mimeType.includes("spreadsheetml") ||
    ext === "xlsx" || ext === "xls"
  )
    return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"

  return null
}

// Main router — picks the right extractor automatically
export async function extractFileContent(
  buffer: Buffer,
  mimeType: SupportedMimeType,
  fileName: string
): Promise<ExtractedFile> {
  console.log(`[EXTRACTOR] Processing ${fileName} as ${mimeType}`)

  switch (mimeType) {
    case "image/jpeg":
    case "image/png":
    case "image/webp":
      return extractFromImage(buffer, mimeType)

    case "application/pdf":
      return extractFromPDF(buffer)

    case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
    case "application/vnd.ms-excel":
      return extractFromExcel(buffer)

    case "text/csv":
      return extractFromCSV(buffer)

    default:
      return {
        extractedText: "Unsupported file type",
        summary: "File could not be processed",
      }
  }
}

export type { ExtractedFile }