import { useInView } from "motion/react"
import { useEffect, useRef, useState } from "react"

export function useTimeline(stepDurations: readonly number[]) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const [step, setStep] = useState(0)
  const [run, setRun] = useState(0)
  const done = step >= stepDurations.length

  useEffect(() => {
    if (!inView || done) return
    const id = setTimeout(() => setStep((s) => s + 1), stepDurations[step])

    return () => clearTimeout(id)
  }, [inView, done, step, stepDurations])

  const replay = () => {
    setStep(0)
    setRun((r) => r + 1)
  }

  return { ref, step, done, run, replay }
}
