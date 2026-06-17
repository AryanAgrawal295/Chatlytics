import * as XLSX from "xlsx"
import Papa from "papaparse"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { ExtractedFile } from "./imageExtractor"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

// Convert JSON rows to readable text table
function rowsToReadableText(
  rows: Record<string, unknown>[],
  sheetName = "Sheet1"
): string {
  if (rows.length === 0) return "Empty sheet"

  const headers = Object.keys(rows[0])
  const headerLine = headers.join(" | ")
  const divider = headers.map(() => "---").join(" | ")
  const dataLines = rows
    .slice(0, 100) // max 100 rows to avoid token overload
    .map((row) => headers.map((h) => String(row[h] ?? "")).join(" | "))

  return [
    `Sheet: ${sheetName}`,
    headerLine,
    divider,
    ...dataLines,
    rows.length > 100 ? `... and ${rows.length - 100} more rows` : "",
  ]
    .filter(Boolean)
    .join("\n")
}

async function summarizeTableData(text: string): Promise<string> {
  const prompt = `
Summarize what this spreadsheet/table data contains in one sentence.
Focus on what kind of data it is (transactions, orders, inventory, etc.)
Data preview: "${text.slice(0, 800)}"
Respond with only the summary sentence.
`.trim()

  try {
    const result = await model.generateContent(prompt)
    return result.response.text().trim()
  } catch {
    return "Spreadsheet with tabular data"
  }
}

export async function extractFromExcel(
  buffer: Buffer
): Promise<ExtractedFile> {
  try {
    const workbook = XLSX.read(buffer, { type: "buffer" })
    const allSheetTexts: string[] = []

    for (const sheetName of workbook.SheetNames) {
      const sheet = workbook.Sheets[sheetName]
      const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet)
      allSheetTexts.push(rowsToReadableText(rows, sheetName))
    }

    const extractedText = allSheetTexts.join("\n\n")
    const summary = await summarizeTableData(extractedText)

    return { extractedText, summary }
  } catch (error) {
    console.error("[EXCEL EXTRACTOR ERROR]", error)
    return {
      extractedText: "Could not parse Excel file",
      summary: "Excel file — extraction failed",
    }
  }
}

export async function extractFromCSV(
  buffer: Buffer
): Promise<ExtractedFile> {
  try {
    const csvString = buffer.toString("utf-8")
    const parsed = Papa.parse<Record<string, unknown>>(csvString, {
      header: true,
      skipEmptyLines: true,
    })

    const extractedText = rowsToReadableText(parsed.data)
    const summary = await summarizeTableData(extractedText)

    return { extractedText, summary }
  } catch (error) {
    console.error("[CSV EXTRACTOR ERROR]", error)
    return {
      extractedText: "Could not parse CSV file",
      summary: "CSV file — extraction failed",
    }
  }
}