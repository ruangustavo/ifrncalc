import { db } from "@/lib/db"

export async function GET() {
  if (!db) {
    return Response.json({ ok: false }, { status: 503 })
  }

  await db.execute("SELECT 1")
  return Response.json({ ok: true })
}
