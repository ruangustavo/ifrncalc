"use client"

import { useEffect } from "react"

import { recordVisit } from "@/actions/record-event"
import type { DisplayMode } from "@/lib/events"

function currentDisplayMode(): DisplayMode {
  if (window.matchMedia("(display-mode: fullscreen)").matches) {
    return "fullscreen"
  }

  if (
    window.matchMedia("(display-mode: standalone)").matches ||
    ("standalone" in navigator && navigator.standalone === true)
  ) {
    return "standalone"
  }

  return "browser"
}

export function VisitRecorder() {
  useEffect(() => {
    void recordVisit(currentDisplayMode())
  }, [])

  return null
}
