import type { Client } from "@libsql/client"

import type { Device } from "./device"

export const DISPLAY_MODES = ["browser", "standalone", "fullscreen"] as const

export type DisplayMode = (typeof DISPLAY_MODES)[number]

export type AppEvent =
  | { type: "student_visited"; device: Device; displayMode: DisplayMode }
  | { type: "grade_simulated" }

export async function recordEvent(
  db: Client,
  studentId: number,
  event: AppEvent,
): Promise<void> {
  const [device, displayMode] =
    event.type === "student_visited"
      ? [event.device, event.displayMode]
      : [null, null]

  await db.execute({
    sql: `INSERT OR IGNORE INTO events (student_id, type, device, display_mode, occurred_at)
          VALUES (?, ?, ?, ?, ?)`,
    args: [
      studentId,
      event.type,
      device,
      displayMode,
      new Date().toISOString(),
    ],
  })
}
