"use client"

import { type ReactNode, useEffect, useRef } from "react"

export function MapFrame({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current

    if (!element || element.getBoundingClientRect().top < innerHeight) return

    element.dataset.pins = "waiting"

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return

        element.dataset.pins = "dropped"
        observer.disconnect()
      },
      { threshold: 0.35 },
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return <div ref={ref}>{children}</div>
}
