"use client"

import { ChangeEvent, FormEvent, useMemo, useState } from "react"

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

const LOCAL_USER_ID = "local-preview-user"

export function Workspace() {
  const [activeTab, setActiveTab] = useState<Tab>("analysis")
  const [transcript, setTranscript] = useState("")
  const [fileName, setFileName] = useState("")
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [transcriptId, setTranscriptId] = useState("")
  const [chunkCount, setChunkCount] = useState<number | null>(null)
  const [status, setStatus] = useState("")
  const [error, setError] = useState("")
  const [isIngesting, setIsIngesting] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const canIngest = transcript.trim().length > 0 && !isIngesting
  const canAnalyze =
    transcriptId.trim().length > 0 && question.trim().length > 0 && !isAnalyzing

  const transcriptStats = useMemo(() => {
    const lines = transcript.split("\n").filter((line) => line.trim()).length
    const words = transcript.trim() ? transcript.trim().split(/\s+/).length : 0
    return { lines, words }
  }, [transcript])

  async function handleFileUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return

    setError("")
    setFileName(file.name)
    setTranscript(await file.text())
    setTranscriptId("")
    setAnswer("")
    setChunkCount(null)
    setStatus("Transcript loaded. Ingest it before asking questions.")
  }

  async function ingestTranscript() {
    if (!canIngest) return

    setIsIngesting(true)
    setError("")
    setAnswer("")
    setStatus("Ingesting transcript...")

    try {
      const response = await fetch("/api/ingest", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          transcript,
          userId: LOCAL_USER_ID,
          fileName: fileName || "pasted_transcript",
        }),
      })

      const data = (await response.json()) as IngestResponse
      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to ingest transcript")
      }

      setTranscriptId(data.transcriptId)
      setChunkCount(data.chunkCount)
      setStatus(`Ready. ${data.chunkCount} chunks stored for analysis.`)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to ingest transcript")
      setStatus("")
    } finally {
      setIsIngesting(false)
    }
  }

  async function askQuestion(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!canAnalyze) return

    setIsAnalyzing(true)
    setError("")
    setAnswer("")
    setStatus("Finding relevant conversation context...")

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          question,
          transcriptId,
          userId: LOCAL_USER_ID,
        }),
      })

      const data = (await response.json()) as AnalyzeResponse
      if (!response.ok || data.error) {
        throw new Error(data.error || "Failed to analyze transcript")
      }

      setAnswer(data.answer || "No answer returned.")
      setStatus(
        typeof data.chunksUsed === "number"
          ? `Answer grounded in ${data.chunksUsed} retrieved chunks.`
          : "Answer generated."
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to analyze transcript")
      setStatus("")
    } finally {
      setIsAnalyzing(false)
    }
  }

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
          <div className="panel">
            <div className="panel-heading">
              <div>
                <h2>Transcript</h2>
                <p>{transcriptStats.lines} lines / {transcriptStats.words} words</p>
              </div>
              <label className="file-button">
                Upload .txt
                <input accept=".txt,text/plain" type="file" onChange={handleFileUpload} />
              </label>
            </div>

            <textarea
              className="transcript-input"
              placeholder="Paste a customer-agent chat transcript here..."
              value={transcript}
              onChange={(event) => {
                setTranscript(event.target.value)
                setTranscriptId("")
                setAnswer("")
                setChunkCount(null)
              }}
            />

            <div className="action-row">
              <button
                className="primary-button"
                type="button"
                disabled={!canIngest}
                onClick={ingestTranscript}
              >
                {isIngesting ? "Ingesting..." : "Ingest Transcript"}
              </button>
              {chunkCount !== null ? (
                <span className="inline-status">{chunkCount} chunks indexed</span>
              ) : null}
            </div>
          </div>

          <div className="panel">
            <div className="panel-heading">
              <div>
                <h2>Ask</h2>
                <p>{transcriptId ? "Transcript is ready" : "Ingest transcript first"}</p>
              </div>
            </div>

            <form className="question-form" onSubmit={askQuestion}>
              <textarea
                className="question-input"
                placeholder="Ask what happened, why the customer was upset, whether the issue was resolved..."
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
              />
              <button className="primary-button" type="submit" disabled={!canAnalyze}>
                {isAnalyzing ? "Analyzing..." : "Ask Question"}
              </button>
            </form>

            <div className="answer-box" aria-live="polite">
              {answer ? <p>{answer}</p> : <p className="muted">The grounded answer will appear here.</p>}
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
              <p className="muted">Bot testing can be connected once templates are saved.</p>
            </div>
          </div>
        </section>
      )}

      {(status || error) && (
        <div className={error ? "toast error" : "toast"}>
          {error || status}
        </div>
      )}
    </main>
  )
}
