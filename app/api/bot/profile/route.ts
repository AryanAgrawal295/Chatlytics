import { NextRequest, NextResponse } from "next/server"
import { buildStyleProfile } from "@/lib/styleProfiler"

export async function POST(req: NextRequest) {
  try {
    const { transcript, transcripts, userName } = await req.json()
    const sources: string[] = Array.isArray(transcripts)
      ? transcripts
          .map((source) =>
            typeof source === "string" ? source : source?.content
          )
          .filter(
            (content): content is string =>
              typeof content === "string" && Boolean(content.trim())
          )
      : typeof transcript === "string" && transcript.trim()
        ? [transcript]
        : []

    if (sources.length === 0) {
      return NextResponse.json({ error: "At least one old chat is required" }, { status: 400 })
    }
    if (sources.length > 12) {
      return NextResponse.json({ error: "Use at most 12 chat files at a time" }, { status: 400 })
    }
    if (typeof userName !== "string" || !userName.trim()) {
      return NextResponse.json(
        { error: "Enter your name exactly as it appears in the old chat" },
        { status: 400 }
      )
    }

    const boundedSources = sources.map((source) => source.slice(0, 150_000))
    if (boundedSources.reduce((total, source) => total + source.length, 0) > 600_000) {
      return NextResponse.json(
        { error: "Combined chat samples are too large. Keep them under 600,000 characters." },
        { status: 400 }
      )
    }

    const profile = buildStyleProfile(boundedSources, userName)
    return NextResponse.json({ success: true, profile })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to learn chat style"
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
