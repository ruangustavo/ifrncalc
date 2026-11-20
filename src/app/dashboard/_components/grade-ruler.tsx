"use client"

import { useEffect, useRef } from "react"

import { cn } from "@/lib/utils"

const STEP = 10
const TICKS = Array.from({ length: 101 }, (_, index) => index)

const KEY_DELTAS = new Map([
  ["ArrowRight", 1],
  ["ArrowUp", 1],
  ["ArrowLeft", -1],
  ["ArrowDown", -1],
  ["PageUp", 10],
  ["PageDown", -10],
])

interface GradeRulerProps {
  value: number
  onChange: (value: number) => void
  marker: number | null
  label: string
  valueText: string
}

function clamp(value: number) {
  return Math.min(100, Math.max(0, value))
}

function scrollBehavior(): ScrollBehavior {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "instant"
    : "smooth"
}

export function GradeRuler({
  value,
  onChange,
  marker,
  label,
  valueText,
}: GradeRulerProps) {
  const scroller = useRef<HTMLDivElement>(null)
  const drag = useRef<{ x: number; left: number } | null>(null)
  const initialValue = useRef(value)

  useEffect(() => {
    const node = scroller.current

    if (node) node.scrollLeft = initialValue.current * STEP
  }, [])

  useEffect(() => {
    const node = scroller.current

    if (!node || Math.round(node.scrollLeft / STEP) === value) return

    node.scrollTo({ left: value * STEP, behavior: scrollBehavior() })
  }, [value])

  return (
    <div className="relative" data-vaul-no-drag>
      <div
        ref={scroller}
        // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role -- the value comes from a snapping scroll strip, which a native range input cannot render
        role="slider"
        tabIndex={0}
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
        aria-valuetext={valueText}
        onScroll={(event) => {
          const next = clamp(Math.round(event.currentTarget.scrollLeft / STEP))

          if (next !== value) onChange(next)
        }}
        onKeyDown={(event) => {
          const delta = KEY_DELTAS.get(event.key)

          if (delta === undefined) return

          event.preventDefault()
          onChange(clamp(value + delta))
        }}
        onPointerDown={(event) => {
          if (event.pointerType !== "mouse") return

          event.currentTarget.setPointerCapture(event.pointerId)
          event.currentTarget.dataset.dragging = ""
          drag.current = {
            x: event.clientX,
            left: event.currentTarget.scrollLeft,
          }
        }}
        onPointerMove={(event) => {
          if (!drag.current) return

          event.currentTarget.scrollLeft =
            drag.current.left - (event.clientX - drag.current.x)
        }}
        onPointerUp={(event) => {
          drag.current = null
          delete event.currentTarget.dataset.dragging
        }}
        className="flex snap-x snap-mandatory [scrollbar-width:none] overflow-x-auto overscroll-x-contain rounded-xl [mask-image:linear-gradient(to_right,transparent,black_25%,black_75%,transparent)] outline-none focus-visible:ring-3 focus-visible:ring-ring/50 data-dragging:cursor-grabbing data-dragging:snap-none md:cursor-grab [&::-webkit-scrollbar]:hidden"
      >
        <div className="w-[calc(50%-5px)] shrink-0" />
        {TICKS.map((tick) => (
          <div
            key={tick}
            className="relative flex h-16 w-2.5 shrink-0 snap-center justify-center"
          >
            <span
              className={cn(
                "mt-1 w-px",
                tick % 10 === 0
                  ? "h-7 bg-foreground/50"
                  : tick % 5 === 0
                    ? "h-5 bg-foreground/30"
                    : "h-3 bg-foreground/20",
              )}
            />
            {tick % 10 === 0 && (
              <span className="absolute top-9 text-xs text-muted-foreground tabular-nums">
                {tick}
              </span>
            )}
            {tick === marker && (
              <span className="absolute bottom-1 size-1 rounded-full bg-foreground/60" />
            )}
          </div>
        ))}
        <div className="w-[calc(50%-5px)] shrink-0" />
      </div>
      <span
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 h-9 w-0.5 -translate-x-1/2 rounded-full bg-foreground"
      />
    </div>
  )
}
