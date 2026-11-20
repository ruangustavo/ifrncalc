"use client"

import {
  type FocusEvent,
  type KeyboardEvent,
  type PointerEvent,
  useEffect,
  useRef,
  useState,
} from "react"

type Reveal = "closed" | "peek" | "pinned"

export function useClassPhotoReveal() {
  const [reveal, setReveal] = useState<Reveal>("closed")
  const lastPointer = useRef("")
  const triggerRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (reveal !== "pinned") return

    const closeOutside = (event: MouseEvent) => {
      if (
        event.target instanceof Node &&
        triggerRef.current?.contains(event.target)
      )
        return
      setReveal("closed")
    }

    document.addEventListener("click", closeOutside)

    return () => document.removeEventListener("click", closeOutside)
  }, [reveal])

  const toggle = () =>
    setReveal((current) => (current === "pinned" ? "closed" : "pinned"))

  const triggerProps = {
    ref: triggerRef,
    role: "button",
    tabIndex: 0,
    "aria-expanded": reveal !== "closed",
    onPointerDown: (event: PointerEvent<HTMLElement>) => {
      lastPointer.current = event.pointerType
    },
    onPointerEnter: (event: PointerEvent<HTMLElement>) => {
      if (event.pointerType !== "mouse") return
      setReveal((current) => (current === "closed" ? "peek" : current))
    },
    onPointerLeave: (event: PointerEvent<HTMLElement>) => {
      if (event.pointerType !== "mouse") return
      setReveal((current) => (current === "peek" ? "closed" : current))
    },
    onClick: () => {
      if (lastPointer.current !== "mouse") toggle()
      lastPointer.current = ""
    },
    onKeyDown: (event: KeyboardEvent<HTMLElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault()
        toggle()
      }

      if (event.key === "Escape") setReveal("closed")
    },
    onFocus: (event: FocusEvent<HTMLElement>) => {
      if (!event.currentTarget.matches(":focus-visible")) return
      setReveal((current) => (current === "closed" ? "peek" : current))
    },
    onBlur: () => {
      setReveal((current) => (current === "peek" ? "closed" : current))
    },
  } as const

  return { reveal, triggerProps }
}
