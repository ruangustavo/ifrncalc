"use client"

import { type ReactNode, useLayoutEffect, useRef } from "react"
import { annotate } from "rough-notation"

type AnnotationAction =
  | "highlight"
  | "underline"
  | "box"
  | "circle"
  | "strike-through"
  | "crossed-off"
  | "bracket"

interface HighlighterProps {
  children: ReactNode
  action?: AnnotationAction
  color?: string
  strokeWidth?: number
  animationDuration?: number
  iterations?: number
  padding?: number
  multiline?: boolean
  isView?: boolean
}

export function Highlighter({
  children,
  action = "highlight",
  color = "#ffd1dc",
  strokeWidth = 1.5,
  animationDuration = 600,
  iterations = 2,
  padding = 2,
  multiline = true,
  isView = false,
}: HighlighterProps) {
  const elementRef = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    const element = elementRef.current
    if (!element) return

    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    )
    const annotation = annotate(element, {
      type: action,
      color,
      strokeWidth,
      animationDuration,
      iterations,
      padding,
      multiline,
      animate: !motionPreference.matches,
    })
    let observer: IntersectionObserver | undefined

    if (isView && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            annotation.show()
            observer?.disconnect()
          }
        },
        { rootMargin: "-10%" },
      )
      observer.observe(element)
    } else {
      annotation.show()
    }

    const updateMotionPreference = () => {
      annotation.animate = !motionPreference.matches
      // show() on an already-visible annotation redraws without replaying it.
      if (annotation.isShowing()) annotation.show()
    }
    motionPreference.addEventListener("change", updateMotionPreference)

    // Rough Notation already observes resize and redraws without animation.
    return () => {
      observer?.disconnect()
      motionPreference.removeEventListener("change", updateMotionPreference)
      annotation.remove()
    }
  }, [
    isView,
    action,
    color,
    strokeWidth,
    animationDuration,
    iterations,
    padding,
    multiline,
  ])

  return (
    <span ref={elementRef} className="relative inline-block bg-transparent">
      {children}
    </span>
  )
}
