import { readFileSync } from "node:fs"

import { createClient } from "@libsql/client"

const url = process.env.TURSO_DATABASE_URL

if (!url) {
  console.error("TURSO_DATABASE_URL is not set")
  process.exit(1)
}

const db = createClient({ url, authToken: process.env.TURSO_AUTH_TOKEN })

await db.executeMultiple(readFileSync("db/schema.sql", "utf8"))


await db.executeMultiple(readFileSync("db/campuses.sql", "utf8"))

console.log(`Schema and campuses applied to ${url.split("?")[0]}`)
