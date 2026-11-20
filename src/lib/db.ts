import { type Client, createClient } from "@libsql/client"

function connect(): Client | null {
  const url = process.env.TURSO_DATABASE_URL

  if (!url) {
    return null
  }

  return createClient({ url, authToken: process.env.TURSO_AUTH_TOKEN })
}

export const db = connect()
