// "use client"

// import { ChangeEvent, FormEvent, useMemo, useState } from "react"

// type Tab = "analysis" | "builder"

// type IngestResponse = {
//   success: boolean
//   transcriptId: string
//   chunkCount: number
//   emotionsDetected?: string[]
//   intentsDetected?: string[]
//   error?: string
// }

// type AnalyzeResponse = {
//   answer?: string
//   chunksUsed?: number
//   error?: string
// }

// const LOCAL_USER_ID = "local-preview-user"

// export function Workspace() {
//   const [activeTab, setActiveTab] = useState<Tab>("analysis")
//   const [transcript, setTranscript] = useState("")
//   const [fileName, setFileName] = useState("")
//   const [question, setQuestion] = useState("")
//   const [answer, setAnswer] = useState("")
//   const [transcriptId, setTranscriptId] = useState("")
//   const [chunkCount, setChunkCount] = useState<number | null>(null)
//   const [status, setStatus] = useState("")
//   const [error, setError] = useState("")
//   const [isIngesting, setIsIngesting] = useState(false)
//   const [isAnalyzing, setIsAnalyzing] = useState(false)

//   const canIngest = transcript.trim().length > 0 && !isIngesting
//   const canAnalyze =
//     transcriptId.trim().length > 0 && question.trim().length > 0 && !isAnalyzing

//   const transcriptStats = useMemo(() => {
//     const lines = transcript.split("\n").filter((line) => line.trim()).length
//     const words = transcript.trim() ? transcript.trim().split(/\s+/).length : 0
//     return { lines, words }
//   }, [transcript])

//   async function handleFileUpload(event: ChangeEvent<HTMLInputElement>) {
//     const file = event.target.files?.[0]
//     if (!file) return

//     setError("")
//     setFileName(file.name)
//     setTranscript(await file.text())
//     setTranscriptId("")
//     setAnswer("")
//     setChunkCount(null)
//     setStatus("Transcript loaded. Ingest it before asking questions.")
//   }

//   async function ingestTranscript() {
//     if (!canIngest) return

//     setIsIngesting(true)
//     setError("")
//     setAnswer("")
//     setStatus("Ingesting transcript...")

//     try {
//       const response = await fetch("/api/ingest", {
//         method: "POST",
//         headers: { "content-type": "application/json" },
//         body: JSON.stringify({
//           transcript,
//           userId: LOCAL_USER_ID,
//           fileName: fileName || "pasted_transcript",
//         }),
//       })

//       const data = (await response.json()) as IngestResponse
//       if (!response.ok || !data.success) {
//         throw new Error(data.error || "Failed to ingest transcript")
//       }

//       setTranscriptId(data.transcriptId)
//       setChunkCount(data.chunkCount)
//       setStatus(`Ready. ${data.chunkCount} chunks stored for analysis.`)
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Failed to ingest transcript")
//       setStatus("")
//     } finally {
//       setIsIngesting(false)
//     }
//   }

//   async function askQuestion(event: FormEvent<HTMLFormElement>) {
//     event.preventDefault()
//     if (!canAnalyze) return

//     setIsAnalyzing(true)
//     setError("")
//     setAnswer("")
//     setStatus("Finding relevant conversation context...")

//     try {
//       const response = await fetch("/api/analyze", {
//         method: "POST",
//         headers: { "content-type": "application/json" },
//         body: JSON.stringify({
//           question,
//           transcriptId,
//           userId: LOCAL_USER_ID,
//         }),
//       })

//       const data = (await response.json()) as AnalyzeResponse
//       if (!response.ok || data.error) {
//         throw new Error(data.error || "Failed to analyze transcript")
//       }

//       setAnswer(data.answer || "No answer returned.")
//       setStatus(
//         typeof data.chunksUsed === "number"
//           ? `Answer grounded in ${data.chunksUsed} retrieved chunks.`
//           : "Answer generated."
//       )
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Failed to analyze transcript")
//       setStatus("")
//     } finally {
//       setIsAnalyzing(false)
//     }
//   }

//   return (
//     <main className="workspace-shell">
//       <section className="workspace-header">
//         <div>
//           <p className="eyebrow">Chatlytics</p>
//           <h1>Conversation Intelligence Workspace</h1>
//         </div>
//         <div className="tab-list" aria-label="Workspace views">
//           <button
//             className={activeTab === "analysis" ? "tab active" : "tab"}
//             type="button"
//             onClick={() => setActiveTab("analysis")}
//           >
//             Chat Analysis
//           </button>
//           <button
//             className={activeTab === "builder" ? "tab active" : "tab"}
//             type="button"
//             onClick={() => setActiveTab("builder")}
//           >
//             Bot Builder
//           </button>
//         </div>
//       </section>

//       {activeTab === "analysis" ? (
//         <section className="analysis-grid">
//           <div className="panel">
//             <div className="panel-heading">
//               <div>
//                 <h2>Transcript</h2>
//                 <p>{transcriptStats.lines} lines / {transcriptStats.words} words</p>
//               </div>
//               <label className="file-button">
//                 Upload .txt
//                 <input accept=".txt,text/plain" type="file" onChange={handleFileUpload} />
//               </label>
//             </div>

//             <textarea
//               className="transcript-input"
//               placeholder="Paste a customer-agent chat transcript here..."
//               value={transcript}
//               onChange={(event) => {
//                 setTranscript(event.target.value)
//                 setTranscriptId("")
//                 setAnswer("")
//                 setChunkCount(null)
//               }}
//             />

//             <div className="action-row">
//               <button
//                 className="primary-button"
//                 type="button"
//                 disabled={!canIngest}
//                 onClick={ingestTranscript}
//               >
//                 {isIngesting ? "Ingesting..." : "Ingest Transcript"}
//               </button>
//               {chunkCount !== null ? (
//                 <span className="inline-status">{chunkCount} chunks indexed</span>
//               ) : null}
//             </div>
//           </div>

//           <div className="panel">
//             <div className="panel-heading">
//               <div>
//                 <h2>Ask</h2>
//                 <p>{transcriptId ? "Transcript is ready" : "Ingest transcript first"}</p>
//               </div>
//             </div>

//             <form className="question-form" onSubmit={askQuestion}>
//               <textarea
//                 className="question-input"
//                 placeholder="Ask what happened, why the customer was upset, whether the issue was resolved..."
//                 value={question}
//                 onChange={(event) => setQuestion(event.target.value)}
//               />
//               <button className="primary-button" type="submit" disabled={!canAnalyze}>
//                 {isAnalyzing ? "Analyzing..." : "Ask Question"}
//               </button>
//             </form>

//             <div className="answer-box" aria-live="polite">
//               {answer ? <p>{answer}</p> : <p className="muted">The grounded answer will appear here.</p>}
//             </div>
//           </div>
//         </section>
//       ) : (
//         <section className="builder-grid">
//           <div className="panel">
//             <div className="panel-heading">
//               <div>
//                 <h2>Bot Builder</h2>
//                 <p>Template setup placeholder</p>
//               </div>
//             </div>
//             <div className="builder-form">
//               <label>
//                 Template
//                 <select defaultValue="support">
//                   <option value="support">Customer Support</option>
//                   <option value="sales">Sales Assistant</option>
//                   <option value="feedback">Feedback Collector</option>
//                 </select>
//               </label>
//               <label>
//                 Bot name
//                 <input placeholder="Retention Analyst" />
//               </label>
//               <label>
//                 Instructions
//                 <textarea placeholder="Describe how this bot should respond..." />
//               </label>
//             </div>
//           </div>
//           <div className="panel">
//             <div className="panel-heading">
//               <div>
//                 <h2>Test Chat</h2>
//                 <p>Coming after analysis flow is stable</p>
//               </div>
//             </div>
//             <div className="answer-box">
//               <p className="muted">Bot testing can be connected once templates are saved.</p>
//             </div>
//           </div>
//         </section>
//       )}

//       {(status || error) && (
//         <div className={error ? "toast error" : "toast"}>
//           {error || status}
//         </div>
//       )}
//     </main>
//   )
// }


"use client"

import { ChangeEvent, DragEvent, FormEvent, useMemo, useState } from "react"

type Tab = "analysis" | "builder"

type IngestResponse = {
  success: boolean
  transcriptId: string
  chunkCount: number
  emotionsDetected?: string[]
  intentsDetected?: string[]
  error?: string
}

type AnalyzeResponse = {
  answer?: string
  chunksUsed?: number
  error?: string
}

type FileAttachmentResult = {
  success: boolean
  attachmentId: string
  fileName: string
  summary: string
  chunksCreated: number
  error?: string
}

type AttachedFile = {
  fileName: string
  summary: string
  uploadedBy: "customer" | "agent"
  status: "processing" | "done" | "error"
}

type FolderProgress = {
  total: number
  done: number
  current: string
}

const LOCAL_USER_ID = "local-preview-user"
const ACCEPTED_TRANSCRIPT_TYPES = ".txt,.pdf,.jpg,.jpeg,.png,.webp,.xlsx,.xls,.csv"

// File type helpers
const TEXT_EXTS = ["txt"]
const MEDIA_EXTS = ["pdf", "jpg", "jpeg", "png", "webp", "xlsx", "xls", "csv"]

function getExt(name: string) {
  return name.split(".").pop()?.toLowerCase() ?? ""
}

function isTextFile(file: File) {
  return TEXT_EXTS.includes(getExt(file.name))
}

function isMediaFile(file: File) {
  return MEDIA_EXTS.includes(getExt(file.name))
}

// Skip hidden files, system files, and folders browsers sometimes include
function isUsableFile(file: File) {
  return (
    !file.name.startsWith(".") &&
    !file.name.startsWith("__") &&
    file.size > 0 &&
    (isTextFile(file) || isMediaFile(file))
  )
}

export function Workspace() {
  const [activeTab, setActiveTab] = useState<Tab>("analysis")

  // ── Transcript / session state ──────────────────────────────────────────
  const [transcript, setTranscript] = useState("")
  const [pastedFileName, setPastedFileName] = useState("")
  const [transcriptId, setTranscriptId] = useState("")
  const [totalChunks, setTotalChunks] = useState<number | null>(null)

  // ── Upload state ────────────────────────────────────────────────────────
  const [uploadMode, setUploadMode] = useState<"paste" | "folder">("paste")
  const [isDragging, setIsDragging] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [folderProgress, setFolderProgress] = useState<FolderProgress | null>(null)
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([])

  // ── Q&A state ───────────────────────────────────────────────────────────
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  // ── UI feedback ─────────────────────────────────────────────────────────
  const [status, setStatus] = useState("")
  const [error, setError] = useState("")

  // ── Derived ─────────────────────────────────────────────────────────────
  const canIngest = transcript.trim().length > 0 && !isProcessing
  const canAnalyze = transcriptId.length > 0 && question.trim().length > 0 && !isAnalyzing
  const sessionReady = transcriptId.length > 0

  const transcriptStats = useMemo(() => {
    const lines = transcript.split("\n").filter((l) => l.trim()).length
    const words = transcript.trim() ? transcript.trim().split(/\s+/).length : 0
    return { lines, words }
  }, [transcript])

  // ── Reset session ───────────────────────────────────────────────────────
  function resetSession() {
    setTranscriptId("")
    setTotalChunks(null)
    setAttachedFiles([])
    setAnswer("")
    setFolderProgress(null)
    setError("")
  }

  // ────────────────────────────────────────────────────────────────────────
  // PASTE MODE — ingest plain text transcript
  // ────────────────────────────────────────────────────────────────────────
  async function ingestTranscript() {
    if (!canIngest) return
    setIsProcessing(true)
    setError("")
    setAnswer("")
    resetSession()
    setStatus("Ingesting transcript...")

    try {
      const res = await fetch("/api/ingest", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          transcript,
          userId: LOCAL_USER_ID,
          fileName: pastedFileName || "pasted_transcript",
        }),
      })
      const data = (await res.json()) as IngestResponse
      if (!res.ok || !data.success) throw new Error(data.error || "Ingest failed")

      setTranscriptId(data.transcriptId)
      setTotalChunks(data.chunkCount)
      setStatus(
        `Ready. ${data.chunkCount} chunks stored.` +
          (data.emotionsDetected?.length
            ? ` Emotions: ${data.emotionsDetected.join(", ")}.`
            : "")
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to ingest transcript")
      setStatus("")
    } finally {
      setIsProcessing(false)
    }
  }

  // ────────────────────────────────────────────────────────────────────────
  // FOLDER MODE — process all files in the selected folder
  // ────────────────────────────────────────────────────────────────────────
  async function processFolderFiles(allFiles: File[]) {
    const usable = allFiles.filter(isUsableFile)
    if (usable.length === 0) {
      setError("No supported files found in the folder.")
      return
    }

    setIsProcessing(true)
    setError("")
    resetSession()

    const textFiles = usable.filter(isTextFile)
    const mediaFiles = usable.filter(isMediaFile)

    setFolderProgress({ total: usable.length, done: 0, current: "" })

    // ── Step 1: Combine all text files into one transcript ────────────────
    let combinedTranscript = ""
    let currentTranscriptId = ""
    let chunksSoFar = 0

    if (textFiles.length > 0) {
      setStatus(`Reading ${textFiles.length} text file(s)...`)
      for (const file of textFiles) {
        const text = await file.text()
        combinedTranscript += `\n\n[FILE: ${file.name}]\n${text}`
      }

      combinedTranscript = combinedTranscript.trim()

      setFolderProgress((p) => ({
        ...p!,
        current: textFiles.map((f) => f.name).join(", "),
      }))

      try {
        const res = await fetch("/api/ingest", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            transcript: combinedTranscript,
            userId: LOCAL_USER_ID,
            fileName: `folder_session_${Date.now()}`,
          }),
        })
        const data = (await res.json()) as IngestResponse
        if (!res.ok || !data.success) throw new Error(data.error || "Text ingest failed")

        currentTranscriptId = data.transcriptId
        chunksSoFar += data.chunkCount
        setTranscriptId(currentTranscriptId)

        setFolderProgress((p) => ({
          ...p!,
          done: p!.done + textFiles.length,
        }))
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to ingest text files")
        setIsProcessing(false)
        return
      }
    }

    // ── Step 2: If no text files, seed a session so we have a transcriptId ─
    if (!currentTranscriptId) {
      try {
        const res = await fetch("/api/ingest", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            transcript: `[Folder upload session — ${usable.length} files]`,
            userId: LOCAL_USER_ID,
            fileName: "folder_session",
          }),
        })
        const data = (await res.json()) as IngestResponse
        if (!res.ok || !data.success) throw new Error("Failed to create session")
        currentTranscriptId = data.transcriptId
        setTranscriptId(currentTranscriptId)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to create session")
        setIsProcessing(false)
        return
      }
    }

    // ── Step 3: Process each media file sequentially ──────────────────────
    const newAttachments: AttachedFile[] = []

    for (let i = 0; i < mediaFiles.length; i++) {
      const file = mediaFiles[i]

      setFolderProgress((p) => ({
        total: p!.total,
        done: (textFiles.length > 0 ? textFiles.length : 0) + i,
        current: file.name,
      }))

      // Add as "processing" immediately so user sees progress
      setAttachedFiles((prev) => [
        ...prev,
        { fileName: file.name, summary: "Processing...", uploadedBy: "customer", status: "processing" },
      ])

      try {
        const formData = new FormData()
        formData.append("file", file)
        formData.append("transcriptId", currentTranscriptId)
        formData.append("userId", LOCAL_USER_ID)
        formData.append("uploadedBy", "customer")

        const res = await fetch("/api/ingest-file", {
          method: "POST",
          body: formData,
        })
        const data = (await res.json()) as FileAttachmentResult

        if (!res.ok || !data.success) throw new Error(data.error || "File failed")

        chunksSoFar += data.chunksCreated
        newAttachments.push({
          fileName: file.name,
          summary: data.summary,
          uploadedBy: "customer",
          status: "done",
        })

        // Update this file's status from "processing" → "done"
        setAttachedFiles((prev) =>
          prev.map((f) =>
            f.fileName === file.name
              ? { ...f, summary: data.summary, status: "done" }
              : f
          )
        )
      } catch {
        setAttachedFiles((prev) =>
          prev.map((f) =>
            f.fileName === file.name
              ? { ...f, summary: "Failed to process", status: "error" }
              : f
          )
        )
      }
    }

    setTotalChunks(chunksSoFar)
    setFolderProgress({ total: usable.length, done: usable.length, current: "" })
    setStatus(
      `Done. ${usable.length} files processed — ${chunksSoFar} chunks indexed and ready.`
    )
    setIsProcessing(false)
  }

  // ── Folder input change ────────────────────────────────────────────────
  function onFolderInputChange(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? [])
    event.target.value = ""
    if (files.length > 0) processFolderFiles(files)
  }

  // ── Drag and drop (supports dropping entire folders) ───────────────────
  function onDragOver(e: DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setIsDragging(true)
  }
  function onDragLeave(e: DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setIsDragging(false)
  }
  async function onDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setIsDragging(false)

    // Use DataTransferItemList to read folders via FileSystem API
    const items = Array.from(e.dataTransfer.items)
    const files: File[] = []

    async function readEntry(entry: FileSystemEntry): Promise<void> {
      if (entry.isFile) {
        await new Promise<void>((resolve) => {
          (entry as FileSystemFileEntry).file((f) => {
            files.push(f)
            resolve()
          })
        })
      } else if (entry.isDirectory) {
        const reader = (entry as FileSystemDirectoryEntry).createReader()
        await new Promise<void>((resolve) => {
          reader.readEntries(async (entries) => {
            for (const e of entries) await readEntry(e)
            resolve()
          })
        })
      }
    }

    for (const item of items) {
      const entry = item.webkitGetAsEntry()
      if (entry) await readEntry(entry)
    }

    if (files.length > 0) processFolderFiles(files)
  }

  // ── Q&A ────────────────────────────────────────────────────────────────
  async function askQuestion(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!canAnalyze) return

    setIsAnalyzing(true)
    setError("")
    setAnswer("")
    setStatus("Finding relevant context...")

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ question, transcriptId, userId: LOCAL_USER_ID }),
      })
      const data = (await res.json()) as AnalyzeResponse
      if (!res.ok || data.error) throw new Error(data.error || "Analysis failed")

      setAnswer(data.answer || "No answer returned.")
      setStatus(
        typeof data.chunksUsed === "number"
          ? `Answer grounded in ${data.chunksUsed} retrieved chunks.`
          : "Answer generated."
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to analyze")
      setStatus("")
    } finally {
      setIsAnalyzing(false)
    }
  }

  // ────────────────────────────────────────────────────────────────────────
  // RENDER
  // ────────────────────────────────────────────────────────────────────────
  const progressPct =
    folderProgress && folderProgress.total > 0
      ? Math.round((folderProgress.done / folderProgress.total) * 100)
      : 0

  return (
    <main className="workspace-shell">
      <section className="workspace-header">
        <div>
          <p className="eyebrow">Chatlytics</p>
          <h1>Conversation Intelligence Workspace</h1>
        </div>
        <div className="tab-list" aria-label="Workspace views">
          <button
            className={activeTab === "analysis" ? "tab active" : "tab"}
            type="button"
            onClick={() => setActiveTab("analysis")}
          >
            Chat Analysis
          </button>
          <button
            className={activeTab === "builder" ? "tab active" : "tab"}
            type="button"
            onClick={() => setActiveTab("builder")}
          >
            Bot Builder
          </button>
        </div>
      </section>

      {activeTab === "analysis" ? (
        <section className="analysis-grid">

          {/* ── LEFT PANEL ── */}
          <div className="panel">
            <div className="panel-heading">
              <div>
                <h2>Input</h2>
                <p>
                  {uploadMode === "paste"
                    ? `${transcriptStats.lines} lines / ${transcriptStats.words} words`
                    : folderProgress
                    ? folderProgress.done < folderProgress.total
                      ? `${folderProgress.done} / ${folderProgress.total} files`
                      : `${folderProgress.total} files processed`
                    : "Drop a folder or browse"}
                </p>
              </div>

              {/* Paste / Folder toggle */}
              <div className="upload-mode-toggle">
                <button
                  type="button"
                  className={uploadMode === "paste" ? "mode-btn active" : "mode-btn"}
                  onClick={() => { setUploadMode("paste"); resetSession() }}
                >
                  Paste text
                </button>
                <button
                  type="button"
                  className={uploadMode === "folder" ? "mode-btn active" : "mode-btn"}
                  onClick={() => { setUploadMode("folder"); resetSession() }}
                >
                  Upload folder
                </button>
              </div>
            </div>

            {/* ── PASTE MODE ── */}
            {uploadMode === "paste" && (
              <>
                <textarea
                  className="transcript-input"
                  placeholder="Paste a customer-agent chat transcript here..."
                  value={transcript}
                  onChange={(e) => {
                    setTranscript(e.target.value)
                    setPastedFileName("")
                    resetSession()
                  }}
                />
                <div className="action-row">
                  <button
                    className="primary-button"
                    type="button"
                    disabled={!canIngest}
                    onClick={ingestTranscript}
                  >
                    {isProcessing ? "Ingesting..." : "Ingest Transcript"}
                  </button>
                  {totalChunks !== null && (
                    <span className="inline-status">{totalChunks} chunks indexed</span>
                  )}
                </div>
              </>
            )}

            {/* ── FOLDER MODE ── */}
            {uploadMode === "folder" && (
              <>
                <div
                  className={isDragging ? "drop-zone drop-zone--active" : "drop-zone"}
                  onDragOver={onDragOver}
                  onDragLeave={onDragLeave}
                  onDrop={onDrop}
                >
                  {isProcessing ? (
                    // Processing state
                    <div className="drop-zone-processing">
                      <div className="progress-bar-track">
                        <div
                          className="progress-bar-fill"
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>
                      <p className="drop-zone-title">{progressPct}% complete</p>
                      {folderProgress?.current && (
                        <p className="drop-zone-hint">
                          Processing: {folderProgress.current}
                        </p>
                      )}
                    </div>
                  ) : sessionReady ? (
                    // Done state
                    <div className="drop-zone-success">
                      <span className="drop-zone-icon">✓</span>
                      <p className="drop-zone-title">
                        {folderProgress?.total} files ready
                      </p>
                      <p className="drop-zone-hint">
                        {totalChunks} chunks indexed — ready to query
                      </p>
                      <label className="file-button" style={{ marginTop: "0.75rem" }}>
                        Upload new folder
                        {/* webkitdirectory enables folder selection */}
                        <input
                          type="file"
                          // @ts-expect-error — webkitdirectory not in React types but works in all modern browsers
                          webkitdirectory="true"
                          multiple
                          onChange={onFolderInputChange}
                        />
                      </label>
                    </div>
                  ) : (
                    // Empty state
                    <>
                      <span className="drop-zone-icon">📁</span>
                      <p className="drop-zone-title">
                        Drop a folder here or{" "}
                        <label className="drop-zone-browse">
                          browse
                          <input
                            type="file"
                            // @ts-expect-error — webkitdirectory not in React types but works in all modern browsers
                            webkitdirectory="true"
                            multiple
                            onChange={onFolderInputChange}
                          />
                        </label>
                      </p>
                      <p className="drop-zone-hint">
                        Mix of .txt · .pdf · .jpg · .png · .xlsx · .csv — all processed together
                      </p>
                    </>
                  )}
                </div>

                {/* File list — shows each file and its status */}
                {attachedFiles.length > 0 && (
                  <ul className="attached-files-list">
                    {attachedFiles.map((f, i) => (
                      <li key={i} className="attached-file-item">
                        <span
                          className={
                            f.status === "done"
                              ? "file-status-dot file-status-dot--done"
                              : f.status === "error"
                              ? "file-status-dot file-status-dot--error"
                              : "file-status-dot file-status-dot--processing"
                          }
                        />
                        <span className="attached-file-name">{f.fileName}</span>
                        <span className="attached-file-summary">{f.summary}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </div>

          {/* ── RIGHT PANEL: Q&A ── */}
          <div className="panel">
            <div className="panel-heading">
              <div>
                <h2>Ask</h2>
                <p>
                  {sessionReady
                    ? attachedFiles.length > 0
                      ? `${attachedFiles.length} file${attachedFiles.length > 1 ? "s" : ""} + transcript ready`
                      : "Transcript ready"
                    : "Upload content first"}
                </p>
              </div>
            </div>

            <form className="question-form" onSubmit={askQuestion}>
              <textarea
                className="question-input"
                placeholder="Ask what happened, why the customer was upset, what a bill shows, whether the issue was resolved..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
              <button className="primary-button" type="submit" disabled={!canAnalyze}>
                {isAnalyzing ? "Analyzing..." : "Ask Question"}
              </button>
            </form>

            <div className="answer-box" aria-live="polite">
              {answer ? (
                <p>{answer}</p>
              ) : (
                <p className="muted">The grounded answer will appear here.</p>
              )}
            </div>
          </div>
        </section>
      ) : (
        <section className="builder-grid">
          <div className="panel">
            <div className="panel-heading">
              <div>
                <h2>Bot Builder</h2>
                <p>Template setup placeholder</p>
              </div>
            </div>
            <div className="builder-form">
              <label>
                Template
                <select defaultValue="support">
                  <option value="support">Customer Support</option>
                  <option value="sales">Sales Assistant</option>
                  <option value="feedback">Feedback Collector</option>
                </select>
              </label>
              <label>
                Bot name
                <input placeholder="Retention Analyst" />
              </label>
              <label>
                Instructions
                <textarea placeholder="Describe how this bot should respond..." />
              </label>
            </div>
          </div>
          <div className="panel">
            <div className="panel-heading">
              <div>
                <h2>Test Chat</h2>
                <p>Coming after analysis flow is stable</p>
              </div>
            </div>
            <div className="answer-box">
              <p className="muted">
                Bot testing can be connected once templates are saved.
              </p>
            </div>
          </div>
        </section>
      )}

      {(status || error) && (
        <div className={error ? "toast error" : "toast"}>{error || status}</div>
      )}
    </main>
  )
}