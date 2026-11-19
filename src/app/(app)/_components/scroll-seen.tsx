"use client"

import { type ReactNode, useEffect, useRef } from "react"

export function ScrollSeen({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current

    if (!element || element.getBoundingClientRect().top < innerHeight) return

    element.dataset.seen = "waiting"

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return

        element.dataset.seen = "shown"
        observer.disconnect()
      },
      { threshold: 0.25 },
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return <div ref={ref}>{children}</div>
}
