import { type RefObject, useEffect } from "react"
import { annotate } from "rough-notation"

import type { RoughMark } from "../use-rough-annotation"

const EASE_SNAP = "cubic-bezier(0.23, 1, 0.32, 1)"
const START_DELAY = 300
const TRAVEL = 220
const WRITE_SPEED = 0.42
const BASELINE = 0.78
const UNWRITTEN = "inset(-50% 100% -50% -10%)"
const WRITTEN = "inset(-50% -10% -50% -10%)"

const CIRCLE: RoughMark = {
  type: "circle",
  strokeWidth: 3,
  padding: [4, 12],
  iterations: 2,
  animationDuration: 700,
}

async function play(
  element: HTMLElement,
  keyframes: Keyframe[],
  options: KeyframeAnimationOptions,
) {
  const animation = element.animate(keyframes, { ...options, fill: "forwards" })

  await animation.finished

  if (!element.isConnected) return

  animation.commitStyles()
  animation.cancel()
}

function at(x: number, y: number) {
  return `translate(${x}px, ${y}px)`
}

export function useChalkWriter(
  board: RefObject<HTMLElement | null>,
  pencil: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    const root = board.current
    const pen = pencil.current

    if (!root || !pen) return

    const circles: ReturnType<typeof annotate>[] = []

    const circle = (element: HTMLElement, animate: boolean) => {
      const annotation = annotate(element, {
        ...CIRCLE,
        color: getComputedStyle(element).color,
        animate,
      })

      circles.push(annotation)
      annotation.show()
    }

    const erase = () => circles.forEach((annotation) => annotation.remove())

    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root
        .querySelectorAll<HTMLElement>('[data-write="circle"]')
        .forEach((element) => circle(element, false))

      return erase
    }

    let alive = true
    let position = { x: 0, y: 0 }

    const move = (x: number, y: number, duration: number, easing: string) => {
      const from = position

      position = { x, y }

      return play(
        pen,
        [{ transform: at(from.x, from.y) }, { transform: at(x, y) }],
        { duration, easing },
      )
    }

    const line = (element: HTMLElement) => {
      const box = root.getBoundingClientRect()
      const rect = element.getBoundingClientRect()

      return {
        start: rect.left - box.left,
        end: rect.right - box.left,
        y: rect.top - box.top + rect.height * BASELINE,
        duration: Math.max(260, rect.width / WRITE_SPEED),
      }
    }

    const write = async (element: HTMLElement) => {
      const { start, end, y, duration } = line(element)

      await move(start, y, TRAVEL, EASE_SNAP)

      if (!alive) return

      pen.toggleAttribute("data-writing", true)

      await Promise.all([
        play(element, [{ clipPath: UNWRITTEN }, { clipPath: WRITTEN }], {
          duration,
          easing: "linear",
        }),
        move(end, y, duration, "linear"),
      ])

      pen.toggleAttribute("data-writing", false)

      if (!alive) return

      element.style.clipPath = "none"

      if (element.dataset.write !== "circle") return

      circle(element, true)
      await move(end + 24, y + 28, CIRCLE.animationDuration ?? 0, EASE_SNAP)
    }

    const run = async () => {
      await document.fonts.ready
      await new Promise((resolve) => setTimeout(resolve, START_DELAY))

      const all = [...root.querySelectorAll<HTMLElement>("[data-write]")]

      const lines = all.filter((element) => element.getClientRects().length > 0)

      if (!alive || lines.length === 0) return

      const first = line(lines[0])

      position = { x: first.start + 48, y: first.y + 56 }
      pen.style.transform = at(position.x, position.y)
      void play(pen, [{ opacity: 0 }, { opacity: 1 }], {
        duration: 200,
        easing: "ease-out",
      })

      for (const element of lines) {
        await write(element)

        if (!alive) return
      }

      all.forEach((element) => {
        element.style.clipPath = "none"
      })

      root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((element) => {
        void play(element, [{ opacity: 0 }, { opacity: 1 }], {
          duration: 200,
          easing: "ease-out",
        })
      })

      void play(
        pen,
        [
          { transform: at(position.x, position.y), opacity: 1 },
          { transform: at(position.x + 60, position.y + 50), opacity: 0 },
        ],
        { duration: 260, easing: EASE_SNAP },
      )
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return

        observer.disconnect()
        void run()
      },
      { threshold: 0.5 },
    )

    observer.observe(root)

    return () => {
      alive = false
      observer.disconnect()
      erase()
    }
  }, [board, pencil])
}
