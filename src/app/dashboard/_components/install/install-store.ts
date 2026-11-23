"use client"

import { create } from "zustand"

import { recordInstallGuideOpened } from "@/actions/record-event"
import type { InstallGuideSource } from "@/lib/events"

export interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

export function isBeforeInstallPromptEvent(
  event: Event,
): event is BeforeInstallPromptEvent {
  return "prompt" in event && "userChoice" in event
}

type Guide = { open: false } | { open: true; source: InstallGuideSource }

interface InstallStore {
  prompt: BeforeInstallPromptEvent | null
  installed: boolean
  guide: Guide
  setPrompt: (prompt: BeforeInstallPromptEvent | null) => void
  markInstalled: () => void
  openGuide: (source: InstallGuideSource) => void
  closeGuide: () => void
}

export const useInstallStore = create<InstallStore>((set) => ({
  prompt: null,
  installed: false,
  guide: { open: false },
  setPrompt: (prompt) => set({ prompt }),
  markInstalled: () => set({ installed: true, prompt: null }),
  openGuide: (source) => {
    set({ guide: { open: true, source } })
    void recordInstallGuideOpened(source)
  },
  closeGuide: () => set({ guide: { open: false } }),
}))
