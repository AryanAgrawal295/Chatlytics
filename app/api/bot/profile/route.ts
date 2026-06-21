import { NextRequest, NextResponse } from "next/server"
import { buildStyleProfile } from "@/lib/styleProfiler"

export async function POST(req: NextRequest) {
  try {
    const { transcript, userName } = await req.json()

    if (typeof transcript !== "string" || !transcript.trim()) {
      return NextResponse.json({ error: "Old chat transcript is required" }, { status: 400 })
    }
    if (typeof userName !== "string" || !userName.trim()) {
      return NextResponse.json(
        { error: "Enter your name exactly as it appears in the old chat" },
        { status: 400 }
      )
    }

    const profile = buildStyleProfile(transcript.slice(0, 100_000), userName)
    return NextResponse.json({ success: true, profile })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to learn chat style"
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
