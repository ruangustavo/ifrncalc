"use client"

import { type ReactNode, useRef } from "react"

import { type RoughMark, useRoughAnnotation } from "../use-rough-annotation"

const CIRCLE: RoughMark = {
  type: "circle",
  strokeWidth: 3,
  padding: [4, 12],
  iterations: 2,
  animationDuration: 700,
}

export function RoughCircle({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null)

  useRoughAnnotation(ref, CIRCLE, (element) => getComputedStyle(element).color)

  return (
    <span ref={ref} className="inline-block px-2 text-lime">
      {children}
    </span>
  )
}
