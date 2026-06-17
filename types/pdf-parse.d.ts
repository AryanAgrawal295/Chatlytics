declare module "pdf-parse" {
  interface PDFInfo {
    PDFFormatVersion: string
    IsAcroFormPresent: boolean
    IsXFAPresent: boolean
    [key: string]: unknown
  }

  interface PDFMetadata {
    [key: string]: unknown
  }

  interface PDFData {
    numpages: number
    numrender: number
    info: PDFInfo
    metadata: PDFMetadata
    text: string
    version: string
  }

  function pdf(
    dataBuffer: Buffer,
    options?: Record<string, unknown>
  ): Promise<PDFData>

  export = pdf
}