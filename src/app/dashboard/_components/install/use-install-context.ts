"use client"

import { useSyncExternalStore } from "react"

import { installPlatformFromUserAgent } from "@/lib/install-platform"

import { contextForScenario } from "./install-scenario"
import { type BeforeInstallPromptEvent, useInstallStore } from "./install-store"
import { INSTALLED_APP_QUERY, isInstalledApp } from "./is-installed-app"

export type InstallContext =
  | { kind: "installed" }
  | { kind: "ios" }
  | { kind: "in-app"; os: "ios" | "android" }
  | { kind: "android-prompt"; prompt: BeforeInstallPromptEvent }
  | { kind: "android-manual" }
  | { kind: "unsupported" }

function subscribeToDisplayMode(onChange: () => void) {
  const query = matchMedia(INSTALLED_APP_QUERY)
  query.addEventListener("change", onChange)

  return () => query.removeEventListener("change", onChange)
}

function subscribeToNothing() {
  return () => {}
}

export function useInstallContext(): InstallContext | null {
  const standalone = useSyncExternalStore(
    subscribeToDisplayMode,
    isInstalledApp,
    () => null,
  )

  const userAgent = useSyncExternalStore(
    subscribeToNothing,
    () => navigator.userAgent,
    () => null,
  )

  const prompt = useInstallStore((state) => state.prompt)
  const installed = useInstallStore((state) => state.installed)
  const scenario = useInstallStore((state) => state.scenario)

  if (scenario) {
    return contextForScenario(scenario)
  }

  if (standalone === null || userAgent === null) {
    return null
  }

  if (standalone || installed) {
    return { kind: "installed" }
  }

  const platform = installPlatformFromUserAgent(userAgent)

  if (platform.kind !== "android") {
    return platform
  }

  return prompt
    ? { kind: "android-prompt", prompt }
    : { kind: "android-manual" }
}

export function canInstall(context: InstallContext | null): boolean {
  return (
    context !== null &&
    context.kind !== "installed" &&
    context.kind !== "unsupported"
  )
}
