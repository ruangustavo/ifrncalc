"use client"

import { useCallback, useLayoutEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

import { arrowBetween, arrowVia, type Point } from "./arrow-geometry"
import { DemoPhone } from "./demo-phone"
import type { Frame } from "./use-demo-story"

type Note =
  | { kind: "colored" }
  | { kind: "simulate" }
  | { kind: "result" }
  | { kind: "invite" }

const LINES: Record<Note["kind"], string[]> = {
  colored: ["ainda não saiu:", "é quanto você", "precisa pra passar"],
  simulate: ["simula a nota", "que você tirou"],
  result: ["e o 4º recalcula", "com essa nota"],
  invite: ["toca aqui e", "simula uma nota"],
}

const ANCHOR: Record<Note["kind"], string | null> = {
  colored: "third",
  simulate: "value",
  result: "fourth",
  invite: null,
}

function noteFor(frame: Frame): Note {
  if (!frame.guided) return { kind: "invite" }

  if (frame.phase === "idle" || frame.phase === "pressing")
    return { kind: "colored" }

  if (frame.phase === "saved") return { kind: "result" }

  return { kind: "simulate" }
}

interface Arrow {
  shaft: string
  head: string
}

export function DemoGuide() {
  const root = useRef<HTMLDivElement>(null)
  const note = useRef<HTMLParagraphElement>(null)
  const [current, setCurrent] = useState<Note>({ kind: "colored" })
  const [arrow, setArrow] = useState<Arrow | null>(null)

  const onFrame = useCallback((frame: Frame) => {
    const next = noteFor(frame)

    setCurrent((previous) => (previous.kind === next.kind ? previous : next))
  }, [])

  useLayoutEffect(() => {
    const element = root.current
    const label = note.current

    if (!element || !label) return

    setArrow(null)

    const measure = () => {
      const box = element.getBoundingClientRect()
      const text = label.getBoundingClientRect()
      const phone = element.querySelector('a[href="/demo"]')

      if (!phone) return

      const screen = phone.getBoundingClientRect()
      const anchorName = ANCHOR[current.kind]

      const anchor = anchorName
        ? element.querySelector(`[data-anchor="${anchorName}"]`)
        : null

      const target = anchor?.getBoundingClientRect()
      const wide = window.matchMedia("(min-width: 1280px)").matches

      const local = (x: number, y: number): Point => ({
        x: x - box.left,
        y: y - box.top,
      })

      if (wide) {
        const start = local(text.right + 10, text.top + text.height / 2)

        const end = target
          ? current.kind === "result"
            ? local(target.left + target.width / 2, target.top - 4)
            : current.kind === "simulate"
              ? local(
                  target.left + target.width / 2 - 52,
                  target.top + target.height / 2,
                )
              : local(target.left - 4, target.top + target.height / 2)
          : local(screen.left + 34, text.top + text.height / 2 + 70)

        setArrow(
          current.kind === "result"
            ? arrowVia(start, end, { x: end.x, y: start.y })
            : arrowBetween(start, end, 40),
        )

        return
      }

      const start = local(text.right + 8, text.top + 16)

      const end = local(
        target
          ? target.left + target.width / 2
          : screen.left + screen.width * 0.62,
        screen.top + 6,
      )

      setArrow(arrowBetween(start, end, -40))
    }

    const delay = window.setTimeout(
      measure,
      current.kind === "simulate" ? 560 : 60,
    )

    window.addEventListener("resize", measure)

    return () => {
      window.clearTimeout(delay)
      window.removeEventListener("resize", measure)
    }
  }, [current])

  return (
    <div ref={root} className="relative mx-auto w-fit pt-28 xl:pt-0">
      <DemoPhone onFrame={onFrame} />
      <div
        key={current.kind}
        className="pointer-events-none absolute inset-0 z-10 overflow-visible"
      >
        <p
          ref={note}
          data-drawn=""
          className={cn(
            "hand-note absolute font-hand text-[1.75rem] leading-[0.95] whitespace-nowrap text-cream xl:text-3xl",
            "top-0 left-1 xl:top-[24%] xl:right-[calc(100%+1.75rem)] xl:left-auto xl:text-right",
          )}
        >
          {LINES[current.kind].map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
        {arrow && (
          <svg
            aria-hidden
            data-drawn=""
            fill="none"
            className="hand-arrow absolute inset-0 size-full overflow-visible text-lime"
          >
            <path
              data-stroke="shaft"
              pathLength={1}
              d={arrow.shaft}
              stroke="currentColor"
              strokeWidth={2.75}
              strokeLinecap="round"
            />
            <path
              data-stroke="head"
              pathLength={1}
              d={arrow.head}
              stroke="currentColor"
              strokeWidth={2.75}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
    </div>
  )
}
