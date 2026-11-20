"use client"

import { useRouter } from "next/navigation"
import { useId, useSyncExternalStore } from "react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

import { DEV_SHOW_INSTALL_BANNER_COOKIE } from "./install-cookie"
import { INSTALL_SCENARIOS, type InstallScenario } from "./install-scenario"
import { useInstallStore } from "./install-store"

function isInstallScenario(value: string): value is InstallScenario {
  return INSTALL_SCENARIOS.some((scenario) => scenario.id === value)
}

const bannerCookieListeners = new Set<() => void>()

function subscribeToBannerCookie(onChange: () => void) {
  bannerCookieListeners.add(onChange)

  return () => bannerCookieListeners.delete(onChange)
}

function hasBannerCookie() {
  return document.cookie.includes(`${DEV_SHOW_INSTALL_BANNER_COOKIE}=1`)
}

function setBannerCookie(forced: boolean) {
  document.cookie = `${DEV_SHOW_INSTALL_BANNER_COOKIE}=${forced ? 1 : 0}; path=/; max-age=${forced ? 86400 : 0}`

  for (const listener of bannerCookieListeners) {
    listener()
  }
}

export function InstallScenarioPicker() {
  const router = useRouter()
  const selectId = useId()
  const scenario = useInstallStore((state) => state.scenario)
  const setScenario = useInstallStore((state) => state.setScenario)

  const bannerForced = useSyncExternalStore(
    subscribeToBannerCookie,
    hasBannerCookie,
    () => false,
  )

  return (
    <aside
      aria-label="Simular instalação (dev)"
      className="fixed right-4 bottom-24 z-50 grid w-56 gap-2 rounded-xl border bg-popover p-3 text-popover-foreground shadow-lg md:bottom-4"
    >
      <Label htmlFor={selectId}>Simular instalação (dev)</Label>
      <select
        id={selectId}
        value={scenario ?? ""}
        onChange={(event) => {
          const value = event.target.value
          setScenario(isInstallScenario(value) ? value : null)
        }}
        className="h-9 rounded-md border border-input bg-card px-2 text-base md:text-sm"
      >
        <option value="">Real (este navegador)</option>
        {INSTALL_SCENARIOS.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={bannerForced}
          onChange={(event) => {
            setBannerCookie(event.target.checked)
            router.refresh()
          }}
        />
        Forçar banner
      </label>
      <Button
        size="sm"
        variant="outline"
        onClick={() =>
          useInstallStore.setState({ guide: { open: true, source: "menu" } })
        }
      >
        Abrir guia
      </Button>
    </aside>
  )
}
