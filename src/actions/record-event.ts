"use server"

import { getServerSession } from "next-auth"
import { headers } from "next/headers"
import { z } from "zod"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { deviceFromUserAgent } from "@/lib/device"
import {
  type AppEvent,
  DISPLAY_MODES,
  type DisplayMode,
  recordEvent,
} from "@/lib/events"
import { notifyError } from "@/lib/notify"
import { StudentIdentitySchema, upsertStudent } from "@/lib/students"

const DisplayModeSchema = z.enum(DISPLAY_MODES)

async function recordForCurrentStudent(event: AppEvent): Promise<void> {
  const identity = StudentIdentitySchema.safeParse(
    await getServerSession(authOptions),
  )

  if (!db || !identity.success) {
    return
  }

  try {
    const studentId = await upsertStudent(db, {
      ...identity.data,
      academic: null,
    })

    await recordEvent(db, studentId, event)
  } catch (error) {
    notifyError(`events / ${event.type}`, {
      message: error instanceof Error ? error.message : String(error),
    })
  }
}

export async function recordVisit(requested: DisplayMode): Promise<void> {
  const displayMode = DisplayModeSchema.safeParse(requested)

  if (!displayMode.success) {
    return
  }

  const userAgent = (await headers()).get("user-agent") ?? ""

  await recordForCurrentStudent({
    type: "student_visited",
    device: deviceFromUserAgent(userAgent),
    displayMode: displayMode.data,
  })
}

export async function recordGradeSimulated(): Promise<void> {
  await recordForCurrentStudent({ type: "grade_simulated" })
}
