import { Pinecone } from "@pinecone-database/pinecone"

let pinecone: Pinecone | null = null

function requireEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`${name} is required`)
  }
  return value
}

export function getPineconeIndex() {
  if (!pinecone) {
    pinecone = new Pinecone({
      apiKey: requireEnv("PINECONE_API_KEY"),
    })
  }

  return pinecone.index(requireEnv("PINECONE_INDEX_NAME"))
}
