"use client"

import { useEffect, useState } from "react"

import { type CalcFixture, FIXTURES } from "./fixtures"

export function DevDataToggle({
  onPick,
}: {
  onPick: (fixture: CalcFixture) => void
}) {
  const [active, setActive] = useState<string | null>(null)

  const pick = (fixture: CalcFixture) => {
    setActive(fixture.key)
    onPick(fixture)

    const url = new URL(window.location.href)

    url.searchParams.set("data", fixture.key)
    window.history.replaceState(null, "", url)
  }

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("data")
    const fixture = FIXTURES.find((entry) => entry.key === requested)

    if (fixture) pick(fixture)
    // Reads the URL once on mount; pick is stable enough for that single call.
    // oxlint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <fieldset className="fixed bottom-3 left-1/2 z-50 flex max-w-full -translate-x-1/2 gap-0.5 overflow-x-auto rounded-full bg-muted p-1 font-sans text-xs text-muted-foreground shadow-lg ring-1 ring-foreground/20">
      <legend className="sr-only">Dados de teste</legend>
      {FIXTURES.map((fixture) => (
        <button
          key={fixture.key}
          type="button"
          aria-pressed={active === fixture.key}
          onClick={() => pick(fixture)}
          className="rounded-full px-2.5 py-1 whitespace-nowrap aria-pressed:bg-background aria-pressed:text-foreground aria-pressed:shadow-sm"
        >
          {fixture.label}
        </button>
      ))}
    </fieldset>
  )
}
