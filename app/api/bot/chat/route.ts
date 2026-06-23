import { NextRequest, NextResponse } from "next/server"
import { generateText } from "@/lib/gemini"
import {
  buildBotReplyPrompt,
  buildReplyCorrectionPrompt,
  findLearnedGreetingReply,
  validateBotReply,
} from "@/lib/botReply"
import { BotChatMessage, BotRole, StyleProfile } from "@/types/bot"

const ROLES: BotRole[] = [
  "friend",
  "relative",
  "employee",
  "manager",
  "partner",
  "casual",
]

export async function POST(req: NextRequest) {
  try {
    const { role, profile, conversation, message } = (await req.json()) as {
      role: BotRole
      profile: StyleProfile
      conversation: BotChatMessage[]
      message: string
    }

    if (!ROLES.includes(role) || !profile || typeof message !== "string" || !message.trim()) {
      return NextResponse.json({ error: "Role, style profile, and message are required" }, { status: 400 })
    }

    const recentConversation = Array.isArray(conversation)
      ? conversation.slice(-16)
      : []
    const learnedGreeting = findLearnedGreetingReply(
      profile,
      message,
      recentConversation
    )
    if (learnedGreeting) {
      return NextResponse.json({ reply: learnedGreeting, source: "learned_example" })
    }

    const prompt = buildBotReplyPrompt(
      role,
      profile,
      recentConversation,
      message.slice(0, 2_000)
    )
    let reply = (await generateText(prompt, { temperature: 0.65 })).trim()
    if (!reply) throw new Error("Gemini returned an empty reply")

    const validationProblems = validateBotReply(
      reply,
      message,
      recentConversation
    )
    if (validationProblems.length > 0) {
      try {
        const correctionPrompt = buildReplyCorrectionPrompt(
          prompt,
          reply,
          validationProblems
        )
        const correctedReply = (
          await generateText(correctionPrompt, { temperature: 0.75 })
        ).trim()
        const correctionProblems = validateBotReply(
          correctedReply,
          message,
          recentConversation
        )

        if (
          correctedReply &&
          correctionProblems.length <= validationProblems.length
        ) {
          reply = correctedReply
        }
      } catch (correctionError) {
        console.warn(
          "[BOT CHAT WARNING] Correction unavailable; returning first generated reply",
          correctionError
        )
      }
    }

    return NextResponse.json({ reply })
  } catch (error) {
    console.error("[BOT CHAT ERROR]", error)
    const status = (error as { status?: number }).status
    const message =
      status === 429
        ? "Gemini quota is exhausted. Dynamic replies need an available model; please retry after the quota resets or use a billed API key."
        : status === 403
          ? "Gemini access is denied for this API project. Use an API key from a project with Gemini API access."
          : "The AI model could not generate a reply. Please retry."
    return NextResponse.json({ error: message }, { status: 503 })
  }
}
