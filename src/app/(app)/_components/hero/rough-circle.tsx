"use client"

import { type ReactNode, useEffect, useRef } from "react"
import { annotate } from "rough-notation"

export function RoughCircle({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const element = ref.current

    if (!element) return

    const calm = matchMedia("(prefers-reduced-motion: reduce)").matches

    const annotation = annotate(element, {
      type: "circle",
      color: getComputedStyle(element).color,
      strokeWidth: 3,
      padding: [4, 12],
      iterations: 2,
      animate: !calm,
      animationDuration: 700,
    })

    let ready = false
    let visible = false

    const draw = () => {
      if (!ready || !visible) return

      annotation.show()
      observer.disconnect()
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        draw()
      },
      { threshold: 1 },
    )

    observer.observe(element)

    document.fonts.ready.then(() => {
      ready = true
      draw()
    })

    return () => {
      observer.disconnect()
      annotation.remove()
    }
  }, [])

  return (
    <span ref={ref} className="inline-block px-2 text-lime">
      {children}
    </span>
  )
}
