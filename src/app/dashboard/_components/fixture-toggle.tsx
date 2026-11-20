"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

import {
  parseSuapFixture,
  SUAP_FIXTURE_COOKIE,
  SUAP_FIXTURES,
  type SuapFixture,
} from "@/lib/suap/fixtures"
import { cn } from "@/lib/utils"

const LABELS: Record<SuapFixture, string> = {
  demo: "Demo",
  worst: "Worst case",
  empty: "Empty",
  one: "One",
  many: "22 rows",
  error: "SUAP error",
}

function storeFixture(fixture: SuapFixture) {
  document.cookie = `${SUAP_FIXTURE_COOKIE}=${fixture}; path=/; SameSite=Lax`
}

export function FixtureToggle({ current }: { current: SuapFixture }) {
  const router = useRouter()

  const select = (fixture: SuapFixture) => {
    storeFixture(fixture)

    const url = new URL(window.location.href)

    url.searchParams.set("data", fixture)
    window.history.replaceState(null, "", url)
    router.refresh()
  }

  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("data")

    if (param && parseSuapFixture(param) !== current) {
      storeFixture(parseSuapFixture(param))
      router.refresh()
    }
  }, [current, router])

  return (
    <div
      role="toolbar"
      aria-label="Fixture data"
      className="fixed bottom-2 left-1/2 z-[2147483647] flex max-w-[calc(100vw-1rem)] -translate-x-1/2 gap-0.5 overflow-x-auto rounded-lg bg-muted p-0.5 font-sans text-xs text-foreground"
    >
      {SUAP_FIXTURES.map((fixture) => (
        <button
          key={fixture}
          type="button"
          aria-pressed={fixture === current}
          onClick={() => select(fixture)}
          className={cn(
            "rounded-md px-2 py-1 whitespace-nowrap",
            fixture === current && "bg-card shadow-sm",
          )}
        >
          {LABELS[fixture]}
        </button>
      ))}
    </div>
  )
}
