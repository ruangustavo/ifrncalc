import { type RefObject, useEffect, useState } from "react"

const LOOP = 8400

const AT = {
  press: 900,
  open: 1150,
  scrubStart: 1900,
  scrubEnd: 3000,
  save: 3700,
  close: 3900,
  reset: 7600,
}

export type Phase = "idle" | "pressing" | "sheet" | "saving" | "saved"

interface Frame {
  phase: Phase
  value: number
}

function easeInOut(progress: number) {
  return progress < 0.5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2
}

function frameAt(time: number, today: number, target: number): Frame {
  if (time < AT.press) return { phase: "idle", value: today }

  if (time < AT.open) return { phase: "pressing", value: today }

  if (time < AT.scrubStart) return { phase: "sheet", value: today }

  if (time < AT.scrubEnd) {
    const progress = (time - AT.scrubStart) / (AT.scrubEnd - AT.scrubStart)

    return {
      phase: "sheet",
      value: Math.round(today + (target - today) * easeInOut(progress)),
    }
  }

  if (time < AT.save) return { phase: "sheet", value: target }

  if (time < AT.close) return { phase: "saving", value: target }

  if (time < AT.reset) return { phase: "saved", value: target }

  return { phase: "idle", value: today }
}

export function useDemoStory(
  screen: RefObject<HTMLElement | null>,
  today: number,
  target: number,
) {
  const [frame, setFrame] = useState<Frame>({ phase: "idle", value: today })

  useEffect(() => {
    const element = screen.current

    if (!element || matchMedia("(prefers-reduced-motion: reduce)").matches)
      return

    let request = 0
    let started = 0
    let visible = false

    const tick = (now: number) => {
      if (!started) started = now

      const next = frameAt((now - started) % LOOP, today, target)

      setFrame((current) =>
        current.phase === next.phase && current.value === next.value
          ? current
          : next,
      )
      request = requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting === visible) return

      visible = entry.isIntersecting

      if (visible) {
        started = 0
        request = requestAnimationFrame(tick)
      } else {
        cancelAnimationFrame(request)
      }
    })

    observer.observe(element)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(request)
    }
  }, [screen, today, target])

  return frame
}
