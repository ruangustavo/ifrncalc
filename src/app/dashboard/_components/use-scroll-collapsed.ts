"use client"

import { useEffect, useRef, useState } from "react"

const SCROLL_THRESHOLD = 12
const TOP_ZONE = 80

export function useScrollCollapsed() {
  const [collapsed, setCollapsed] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    lastY.current = window.scrollY

    function onScroll() {
      const y = window.scrollY
      const delta = y - lastY.current

      if (Math.abs(delta) < SCROLL_THRESHOLD) return
      setCollapsed(delta > 0 && y > TOP_ZONE)
      lastY.current = y
    }

    window.addEventListener("scroll", onScroll, { passive: true })

    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return [collapsed, setCollapsed] as const
}
