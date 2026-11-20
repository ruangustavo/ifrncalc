import {
  type RefObject,
  useEffect,
  useState,
  useSyncExternalStore,
} from "react"

interface Timeline {
  press: number
  open: number
  scrubStart: number
  scrubEnd: number
  save: number
  close: number
  reset: number
  end: number
}

const GUIDED: Timeline = {
  press: 3600,
  open: 3900,
  scrubStart: 6600,
  scrubEnd: 8200,
  save: 8700,
  close: 8900,
  reset: 13400,
  end: 13400,
}

const LOOP: Timeline = {
  press: 900,
  open: 1150,
  scrubStart: 1900,
  scrubEnd: 3000,
  save: 3700,
  close: 3900,
  reset: 7600,
  end: 8400,
}

export type Phase = "idle" | "pressing" | "sheet" | "saving" | "saved"

export interface Frame {
  phase: Phase
  value: number
  guided: boolean
}

function easeInOut(progress: number) {
  return progress < 0.5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2
}

function frameAt(
  time: number,
  at: Timeline,
  today: number,
  target: number,
): Omit<Frame, "guided"> {
  if (time < at.press) return { phase: "idle", value: today }

  if (time < at.open) return { phase: "pressing", value: today }

  if (time < at.scrubStart) return { phase: "sheet", value: today }

  if (time < at.scrubEnd) {
    const progress = (time - at.scrubStart) / (at.scrubEnd - at.scrubStart)

    return {
      phase: "sheet",
      value: Math.round(today + (target - today) * easeInOut(progress)),
    }
  }

  if (time < at.save) return { phase: "sheet", value: target }

  if (time < at.close) return { phase: "saving", value: target }

  if (time < at.reset) return { phase: "saved", value: target }

  return { phase: "idle", value: today }
}

function storyAt(elapsed: number, today: number, target: number): Frame {
  if (elapsed < GUIDED.end)
    return { ...frameAt(elapsed, GUIDED, today, target), guided: true }

  return {
    ...frameAt((elapsed - GUIDED.end) % LOOP.end, LOOP, today, target),
    guided: false,
  }
}

const REDUCED = "(prefers-reduced-motion: reduce)"

function subscribeReduced(onChange: () => void) {
  const query = matchMedia(REDUCED)

  query.addEventListener("change", onChange)

  return () => query.removeEventListener("change", onChange)
}

export function useDemoStory(
  screen: RefObject<HTMLElement | null>,
  today: number,
  target: number,
): Frame {
  const reduced = useSyncExternalStore(
    subscribeReduced,
    () => matchMedia(REDUCED).matches,
    () => false,
  )

  const [frame, setFrame] = useState<Frame>({
    phase: "idle",
    value: today,
    guided: true,
  })

  useEffect(() => {
    const element = screen.current

    if (!element || reduced) return

    let request = 0
    let resumedAt = 0
    let elapsedBefore = 0
    let visible = false

    const tick = (now: number) => {
      if (!resumedAt) resumedAt = now

      const next = storyAt(elapsedBefore + now - resumedAt, today, target)

      setFrame((current) =>
        current.phase === next.phase &&
        current.value === next.value &&
        current.guided === next.guided
          ? current
          : next,
      )
      request = requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting === visible) return

        visible = entry.isIntersecting

        if (visible) {
          resumedAt = 0
          request = requestAnimationFrame(tick)

          return
        }

        cancelAnimationFrame(request)

        if (resumedAt) elapsedBefore += performance.now() - resumedAt
      },
      { threshold: 0.6 },
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(request)
    }
  }, [screen, today, target, reduced])

  return reduced ? { phase: "idle", value: today, guided: false } : frame
}
