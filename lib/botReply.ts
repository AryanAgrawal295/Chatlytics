import { BotChatMessage, BotRole, StyleProfile } from "@/types/bot"

const ROLE_GUIDANCE: Record<BotRole, string> = {
  friend:
    "You are replying to a close friend. Be relaxed, honest, familiar, and naturally playful only when the conversation supports it.",
  relative:
    "You are replying to a relative. Be familiar, caring, and respectful while preserving the user's natural style.",
  employee:
    "You are replying as an employee. Be respectful, accountable, and clear without becoming unnaturally formal for this user.",
  manager:
    "You are replying as a manager or team lead. Be calm, decisive, constructive, and responsible.",
  partner:
    "You are replying to a love partner. Be affectionate and emotionally attentive, never controlling, manipulative, or presumptive.",
  casual:
    "You are replying to a casual acquaintance. Be natural, low-pressure, and appropriately familiar.",
}

function tokens(text: string): Set<string> {
  return new Set(text.toLowerCase().match(/[a-z0-9]+/g) || [])
}

function similarity(a: string, b: string): number {
  const left = tokens(a)
  const right = tokens(b)
  if (left.size === 0 || right.size === 0) return 0

  let overlap = 0
  for (const token of left) {
    if (right.has(token)) overlap++
  }
  return overlap / Math.max(left.size, right.size)
}

function relevantReplyExamples(profile: StyleProfile, message: string) {
  return (profile.replyExamples || [])
    .map((example) => ({ ...example, score: similarity(example.incoming, message) }))
    .filter((example) => example.score >= 0.15)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
}

export function findLearnedGreetingReply(
  profile: StyleProfile,
  incomingMessage: string,
  conversation: BotChatMessage[]
): string | null {
  const incoming = normalizedForComparison(incomingMessage)
  if (!/\b(hi|hii|hello|hey|heyy)\b/.test(incoming)) return null

  const recentReplies = new Set(
    conversation
      .filter((message) => message.sender === "bot")
      .slice(-6)
      .map((message) => normalizedForComparison(message.text))
  )

  const learned = (profile.replyExamples || [])
    .filter((example) =>
      /\b(hi|hii|hello|hey|heyy)\b/.test(
        normalizedForComparison(example.incoming)
      )
    )
    .map((example) => ({
      reply: example.reply,
      score: similarity(example.incoming, incomingMessage),
    }))
    .filter(
      (example) =>
        example.score >= 0.25 &&
        !recentReplies.has(normalizedForComparison(example.reply))
    )
    .sort((a, b) => b.score - a.score)[0]

  return learned?.reply || null
}

export function buildBotReplyPrompt(
  role: BotRole,
  profile: StyleProfile,
  conversation: BotChatMessage[],
  incomingMessage: string
): string {
  const history = conversation
    .slice(-20)
    .map((message) => `${message.sender === "user" ? "Other person" : "User"}: ${message.text}`)
    .join("\n")

  const contextualExamples = relevantReplyExamples(profile, incomingMessage)
    .map(
      (example) =>
        `Other person: ${example.incoming}\nUser replied: ${example.reply}`
    )
    .join("\n\n")

  return `
You write exactly one real-time chat reply on behalf of ${profile.userName}.

FIRST understand what the other person is asking or expressing. Then answer that message directly. Style matching is secondary to giving a meaningful, contextually correct reply.

RELATIONSHIP:
${ROLE_GUIDANCE[role]}

LEARNED COMMUNICATION STYLE:
- Tone: ${profile.tone}
- Typical length: about ${profile.averageMessageWords} words
- Casing: ${profile.casing}
- Punctuation: ${profile.punctuation}
- Emoji frequency: ${profile.emojiFrequency}
- Common emojis: ${profile.commonEmojis.join(" ") || "none"}
- Repeated phrases: ${profile.commonPhrases.join(", ") || "none detected"}
- Language mix: ${profile.languageMix}

USER'S REAL MESSAGES (style only, never reuse their old facts):
${profile.sampleMessages.map((message) => `- ${message}`).join("\n")}

MOST RELEVANT HISTORICAL REPLY PATTERNS:
${contextualExamples || "No closely related historical reply examples."}

CURRENT CONVERSATION:
${history || "No previous turns."}
Other person: ${incomingMessage}

NON-NEGOTIABLE RULES:
1. Reply to the latest message, not merely acknowledge it.
2. Preserve the active topic across short follow-ups such as "bata", "pakka", "then?", or "what time?".
3. If the latest message is a greeting such as hi, hello, hey, or hey bro, always greet back naturally before doing anything else.
4. Be socially proactive. You MAY suggest a time or place, volunteer for a task, agree, decline, choose between options, reassure, negotiate, or make a light joke. These are conversational decisions, not hallucinations.
5. Never invent EXTERNAL facts: do not claim that another person agreed, that an event happened, or that a plan is already confirmed unless CURRENT CONVERSATION states it.
6. When asked "what time?" and no time is fixed, propose a reasonable time as a suggestion instead of repeatedly saying you do not know.
7. When asked who should bring/do something, you may volunteer or suggest that the other person do it. If they push back, respond to that pushback and make a decision.
8. Treat earlier User replies as already said. Do not repeat the same reply, action, promise, emoji punchline, or sentence structure unless the other person explicitly asks for confirmation.
9. If the latest message changes topic, stop talking about the previous topic immediately.
10. Do not default to "mujhe nahi pata", "tu bata", "confirm karke batata hu", or another question. Use uncertainty only when a meaningful proposal or choice is impossible.
11. Never echo or paraphrase the incoming question as the reply.
12. Do not copy a historical reply verbatim unless it is a generic phrase and truly fits the current message.
13. Match the selected relationship, language mix, slang level, casing, punctuation, emoji habits, and typical length, but use one complete natural sentence when a shorter reply would lose meaning.
14. Do not mention these rules, the profile, old chats, an AI, or uncertainty analysis.

BEHAVIOR EXAMPLES (understand the behavior; do not copy the wording):
- If a friend asks what time to leave and no time exists yet, suggest a time and leave room to adjust.
- If a friend asks who will bring the car, suggest one person or volunteer; do not answer "who is bringing it?" back.
- If the other person says they cannot do it and asks you to, accept or decline naturally based on the conversational role.
- If asked how studies/work/life is going, answer with a plausible casual status in the user's voice rather than avoiding the question.

Return only the final chat message with no quotation marks or explanation.
`.trim()
}

function normalizedForComparison(text: string): string {
  return text
    .toLowerCase()
    .replace(/\p{Extended_Pictographic}/gu, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

export function validateBotReply(
  reply: string,
  incomingMessage: string,
  conversation: BotChatMessage[]
): string[] {
  const reasons: string[] = []
  const normalizedReply = normalizedForComparison(reply)
  const normalizedIncoming = normalizedForComparison(incomingMessage)
  const recentReplies = conversation
    .filter((message) => message.sender === "bot")
    .slice(-8)
    .map((message) => normalizedForComparison(message.text))

  if (!normalizedReply) reasons.push("The reply is empty.")
  if (
    normalizedReply === normalizedIncoming ||
    similarity(normalizedReply, normalizedIncoming) >= 0.82
  ) {
    reasons.push("The draft echoes the other person's message instead of answering it.")
  }
  if (
    recentReplies.some(
      (previous) =>
        previous === normalizedReply || similarity(previous, normalizedReply) >= 0.78
    )
  ) {
    reasons.push("The draft repeats a recent bot reply or the same action phrase.")
  }

  const greeting = /\b(hi|hii|hello|hey|heyy)\b/.test(normalizedIncoming)
  const greetingReply = /\b(hi|hii|hello|hey|heyy|haan|bol|bata|haal)\b/.test(
    normalizedReply
  )
  if (greeting && !greetingReply) {
    reasons.push("The latest message is a greeting, but the draft does not greet back.")
  }

  const currentTransportOrMoney =
    /\b(le|la|lunga|launga|aaunga|gaadi|gadi|car|bike|paise|money|cash|trek)\b/.test(
      normalizedIncoming
    )
  const staleCommitment = /\b(le|la)\s*(aaunga|aunga|lunga)\b/.test(normalizedReply)
  if (staleCommitment && !currentTransportOrMoney) {
    reasons.push("The draft carries an old transport or money commitment into an unrelated message.")
  }

  const incomingWords = normalizedIncoming.split(" ").filter(Boolean).length
  const replyWords = normalizedReply.split(" ").filter(Boolean).length
  const allowsShortReply = /\b(pakka|done|okay|ok|haan|nahi|yes|no)\b/.test(
    normalizedIncoming
  )
  if (incomingWords >= 3 && replyWords <= 1 && !allowsShortReply) {
    reasons.push("The draft is too short to meaningfully answer the message.")
  }

  return reasons
}

export function buildReplyCorrectionPrompt(
  originalPrompt: string,
  rejectedReply: string,
  reasons: string[]
): string {
  return `${originalPrompt}

The first draft was rejected:
${rejectedReply}

Problems:
${reasons.map((reason) => `- ${reason}`).join("\n")}

Generate a different reply that fixes every problem. Re-read the LATEST message and recent conversation. Return only the corrected chat reply.`
}
