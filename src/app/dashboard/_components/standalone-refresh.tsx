"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

import { isInstalledApp } from "./install/is-installed-app"

const STALE_AFTER_MS = 5 * 60 * 1000

export function StandaloneRefresh() {
  const router = useRouter()

  useEffect(() => {
    let hiddenAt: number | null = null

    function onVisibilityChange() {
      if (document.visibilityState === "hidden") {
        hiddenAt = Date.now()

        return
      }

      if (
        hiddenAt !== null &&
        Date.now() - hiddenAt > STALE_AFTER_MS &&
        isInstalledApp()
      ) {
        router.refresh()
      }

      hiddenAt = null
    }

    document.addEventListener("visibilitychange", onVisibilityChange)

    return () =>
      document.removeEventListener("visibilitychange", onVisibilityChange)
  }, [router])

  return null
}
