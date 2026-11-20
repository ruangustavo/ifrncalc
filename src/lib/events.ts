import type { Client } from "@libsql/client"

import type { Device } from "./device"

export const DISPLAY_MODES = ["browser", "standalone", "fullscreen"] as const

export type DisplayMode = (typeof DISPLAY_MODES)[number]

export type AppEvent =
  | { type: "student_visited"; device: Device; displayMode: DisplayMode }
  | { type: "grade_simulated" }
  | { type: "install_guide_opened_banner" }
  | { type: "install_guide_opened_menu" }
  | { type: "app_installed" }

export type InstallGuideSource = "banner" | "menu"

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

export async function visitedOnEarlierDay(
  db: Client,
  enrollmentId: string,
): Promise<boolean> {
  const result = await db.execute({
    sql: `SELECT 1 FROM events
          JOIN students ON students.id = events.student_id
          WHERE students.enrollment_id = ?
            AND events.type = 'student_visited'
            AND substr(events.occurred_at, 1, 10) < date('now')
          LIMIT 1`,
    args: [enrollmentId],
  })

  return result.rows.length > 0
}
