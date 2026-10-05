"use client"

import NumberFlow from "@number-flow/react"
import { ArrowRight, Check, RotateCcw } from "lucide-react"
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react"
import { type ReactNode, useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// motion/react instead of framer-motion 11: the latter flashes the initial value for
// one frame when a hardware-accelerated animation ends.

const EASE_OUT = [0.23, 1, 0.32, 1] as const
const EASE_IN_OUT = [0.77, 0, 0.175, 1] as const
const MERGE_S = 0.55
const GAP_PX = 4

const STEPS = [
  300, 1600, 1200, 2200, 900, 2000, 1600, 2400, 1600, 2200, 900,
] as const
const SOLVED_AT = 8

const BIMESTERS = [
  { label: "1º Bim", weight: 2, grade: 70, known: true, at: 2, mergeAt: 3 },
  { label: "2º Bim", weight: 2, grade: 80, known: true, at: 4, mergeAt: 5 },
  { label: "3º Bim", weight: 3, grade: 50, known: false, at: 6, mergeAt: 9 },
  { label: "4º Bim", weight: 3, grade: 50, known: false, at: 6, mergeAt: 9 },
] as const

type Bimester = (typeof BIMESTERS)[number]

function Verdict() {
  return (
    <span className="font-medium">
      Precisa de <span className="text-primary">50</span> no 3º e 4º Bim{" "}
      <ArrowRight className="inline size-4" /> média{" "}
      <span className="text-green-600">
        60 <Check className="inline size-4" />
      </span>
    </span>
  )
}

const CAPTIONS: Record<number, ReactNode> = {
  1: (
    <>
      <b>Peso</b> é quantas vezes a nota conta.
    </>
  ),
  2: "1º Bim tem peso 2: o 70 entra 2 vezes…",
  3: (
    <>
      …então vale <span className="tabular-nums">70 × 2 = 140</span> pontos.
    </>
  ),
  4: "O 80 do 2º Bim também entra 2 vezes…",
  5: (
    <>
      …e vale <span className="tabular-nums">80 × 2 = 160</span> pontos.
    </>
  ),
  6: "3º e 4º Bim têm peso 3: entram 3 vezes cada.",
  7: (
    <>
      Média 60 em 10 vagas <ArrowRight className="inline size-4" /> precisa de{" "}
      <b>600</b> pontos. Já tem{" "}
      <span className="tabular-nums">140 + 160 = 300</span>.
    </>
  ),
  8: (
    <>
      Faltam 300 em 6 vagas:{" "}
      <span className="text-primary tabular-nums">300 ÷ 6 = 50 cada</span>
    </>
  ),
  9: (
    <>
      <span className="tabular-nums">50 × 3 = 150</span> pontos em cada.
    </>
  ),
  10: <Verdict />,
  11: <Verdict />,
}

function useTimeline(stepDurations: readonly number[]) {
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

function Caption({ step }: { step: number }) {
  const reduce = useReducedMotion()
  return (
    <div className="mt-4 grid min-h-10 place-items-center text-center text-sm">
      <AnimatePresence mode="wait" initial={false}>
        <motion.p
          key={Math.min(step, 10)}
          initial={{
            opacity: 0,
            transform: reduce ? "translateY(0px)" : "translateY(6px)",
          }}
          animate={{ opacity: 1, transform: "translateY(0px)" }}
          exit={{
            opacity: 0,
            transform: reduce ? "translateY(0px)" : "translateY(-6px)",
          }}
          transition={{ duration: 0.25, ease: EASE_OUT }}
        >
          {CAPTIONS[step]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}

type GroupProps = { b: Bimester; step: number }

// Opaque tints, so the merged block sliding over a copy doesn't stack two translucent layers.
function chipClass(b: Bimester) {
  return cn(
    "grid place-items-center rounded-md border-2 font-medium text-xs tabular-nums",
    b.known
      ? "border-[color-mix(in_oklab,var(--color-primary)_30%,var(--color-background))] bg-[color-mix(in_oklab,var(--color-primary)_25%,var(--color-background))] text-foreground"
      : "border-primary bg-primary text-primary-foreground",
  )
}

function DashedSlots({ b, step }: GroupProps) {
  const filled = step >= b.at
  return (
    <div className="absolute inset-0 flex gap-1">
      {Array.from({ length: b.weight }, (_, k) => (
        <div
          key={`${b.label}-slot-${k}`}
          className={cn(
            "flex-1 rounded-md border-2 border-dashed transition-colors duration-300",
            filled ? "border-transparent" : "border-primary/20",
          )}
          style={{ transitionDelay: filled ? `${k * 80}ms` : "0ms" }}
        />
      ))}
    </div>
  )
}

// Copies drop in, then slide to the group's center on merge. They vanish only once the
// merged block fully covers them, so the group never goes blank mid-merge.
function Copies({ b, step }: GroupProps) {
  const reduce = useReducedMotion()
  const shown = step >= b.at
  const merged = step >= b.mergeAt
  const rest = "translateX(0px) translateY(0px) scale(1)"
  const hidden = {
    opacity: 0,
    transform: reduce ? rest : "translateX(0px) translateY(-8px) scale(0.95)",
  }

  return (
    <div className="absolute inset-0 flex gap-1">
      {Array.from({ length: b.weight }, (_, k) => {
        const toCenter = (b.weight - 1) / 2 - k
        return (
          <motion.div
            key={`${b.label}-copy-${k}`}
            className={cn(chipClass(b), "h-full flex-1")}
            initial={hidden}
            animate={
              merged
                ? {
                    opacity: 0,
                    transform: reduce
                      ? rest
                      : `translateX(calc(${toCenter} * (100% + ${GAP_PX}px))) translateY(0px) scale(0.95)`,
                  }
                : shown
                  ? { opacity: 1, transform: rest }
                  : hidden
            }
            transition={
              merged
                ? {
                    transform: { duration: MERGE_S, ease: EASE_IN_OUT },
                    opacity: { duration: 0, delay: reduce ? 0.2 : MERGE_S },
                  }
                : {
                    duration: 0.35,
                    ease: EASE_OUT,
                    delay: shown ? k * 0.08 : 0,
                  }
            }
          >
            {b.known || step >= SOLVED_AT ? b.grade : "?"}
          </motion.div>
        )
      })}
    </div>
  )
}

// "70 × 2" shows, then blurs into the product.
function Evaluate({ b, delay }: { b: Bimester; delay: number }) {
  return (
    <span className="grid place-items-center">
      <motion.span
        className="[grid-area:1/1]"
        initial={{ opacity: 0, filter: "blur(0px)" }}
        animate={{
          opacity: [0, 1, 1, 0],
          filter: ["blur(0px)", "blur(0px)", "blur(0px)", "blur(4px)"],
        }}
        transition={{
          duration: 1.2,
          times: [0, 0.15, 0.8, 1],
          ease: "linear",
          delay,
        }}
      >
        {b.grade} × {b.weight}
      </motion.span>
      <motion.span
        className="font-semibold [grid-area:1/1]"
        initial={{ opacity: 0, filter: "blur(4px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.3, ease: EASE_OUT, delay: delay + 1.0 }}
      >
        <NumberFlow value={b.grade * b.weight} />
      </motion.span>
    </span>
  )
}

// The merged block opens from the center (clip-path) while the copies converge under it.
function MergedBlock({ b, step }: GroupProps) {
  const reduce = useReducedMotion()
  if (step < b.mergeAt) return null
  const inset = (x: number) =>
    `inset(0% calc(50% * ${x}) 0% calc(50% * ${x}) round 6px)`
  return (
    <motion.div
      className={cn(chipClass(b), "absolute inset-0")}
      initial={reduce ? { opacity: 0 } : { clipPath: inset(1) }}
      animate={reduce ? { opacity: 1 } : { clipPath: inset(0) }}
      transition={
        reduce ? { duration: 0.2 } : { duration: MERGE_S, ease: EASE_IN_OUT }
      }
    >
      <Evaluate b={b} delay={reduce ? 0.2 : MERGE_S * 0.6} />
    </motion.div>
  )
}

export function CalcExplainer() {
  const { ref, step, done, run, replay } = useTimeline(STEPS)
  const reduce = useReducedMotion()
  const hidden = {
    opacity: 0,
    transform: reduce ? "translateY(0px)" : "translateY(8px)",
  }

  return (
    <div ref={ref} className="mx-auto w-full max-w-2xl">
      <div key={run}>
        <motion.div
          initial={hidden}
          animate={
            step >= 1 ? { opacity: 1, transform: "translateY(0px)" } : hidden
          }
          transition={{ duration: 0.4, ease: EASE_OUT }}
          className="grid grid-cols-10 gap-1"
        >
          {BIMESTERS.map((b) => (
            <div
              key={b.label}
              className="flex flex-col gap-1.5"
              style={{ gridColumn: `span ${b.weight}` }}
            >
              <div className="relative h-10">
                <DashedSlots b={b} step={step} />
                <Copies b={b} step={step} />
                <MergedBlock b={b} step={step} />
              </div>
              <div className="flex flex-col items-center border-muted-foreground/40 border-t pt-1 text-xs leading-tight">
                <span className="text-muted-foreground">{b.label}</span>
                <span
                  className={cn(
                    "font-medium",
                    b.weight === 3 ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  peso {b.weight}
                </span>
              </div>
            </div>
          ))}
        </motion.div>

        <Caption step={step} />
      </div>

      <div className="mt-6 flex h-9 justify-center">
        {done && (
          <motion.div
            initial={{ opacity: 0, transform: "scale(0.95)" }}
            animate={{ opacity: 1, transform: "scale(1)" }}
            transition={{ duration: 0.25, ease: EASE_OUT }}
          >
            <Button variant="outline" size="sm" onClick={replay}>
              <RotateCcw />
              Ver de novo
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
