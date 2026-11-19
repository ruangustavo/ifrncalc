import { type Client, createClient } from "@libsql/client"

function connect(): Client | null {
  const url = process.env.TURSO_DATABASE_URL
  const authToken = process.env.TURSO_AUTH_TOKEN

  if (!url || !authToken) {
    return null
  }

  return createClient({ url, authToken })
}

export const db = connect()
