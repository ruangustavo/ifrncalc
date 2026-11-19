import type { Client } from "@libsql/client"

export const EVENT_TYPES = [] as const

export type EventType = (typeof EVENT_TYPES)[number]

export async function recordEvent(
  db: Client,
  studentId: number,
  type: EventType,
): Promise<void> {
  await db.execute({
    sql: "INSERT INTO events (student_id, type, occurred_at) VALUES (?, ?, ?)",
    args: [studentId, type, new Date().toISOString()],
  })
}
