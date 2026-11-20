"use client"

import { type ReactNode, useRef } from "react"

import { type RoughMark, useRoughAnnotation } from "./use-rough-annotation"

const HIGHLIGHT: RoughMark = {
  type: "highlight",
  multiline: true,
  iterations: 1,
  animationDuration: 900,
}

export function RoughHighlight({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null)

  useRoughAnnotation(
    ref,
    HIGHLIGHT,
    (element) => getComputedStyle(element).getPropertyValue("--color-lime"),
    0.6,
  )

  return (
    <span ref={ref} className="relative font-semibold">
      {children}
    </span>
  )
}
