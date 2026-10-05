"use client"

import NumberFlow from "@number-flow/react"
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion"
import { ArrowRight, Check, RotateCcw, X } from "lucide-react"
import { type ReactNode, useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const EASE_OUT = [0.23, 1, 0.32, 1] as const

const STEPS = [300, 1800, 1300, 1300, 1600, 2200, 2000, 900] as const
const SOLVED_AT = 6

const BIMESTERS = [
  { label: "1º Bim", weight: 2, grade: 70, known: true, at: 2 },
  { label: "2º Bim", weight: 2, grade: 80, known: true, at: 3 },
  { label: "3º Bim", weight: 3, grade: 50, known: false, at: 4 },
  { label: "4º Bim", weight: 3, grade: 50, known: false, at: 4 },
] as const

type Bimester = (typeof BIMESTERS)[number]

function Op() {
  return <X className="inline size-3 align-[-0.125em]" />
}

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
  3: "…e o 80 do 2º Bim também entra 2 vezes.",
  4: "3º e 4º Bim têm peso 3: entram 3 vezes cada.",
  5: (
    <>
      São 10 notas. Média 60 <ArrowRight className="inline size-4" /> soma
      precisa dar <b>600</b>. Já tem <span className="tabular-nums">300</span>.
    </>
  ),
  6: (
    <>
      Faltam 300 em 6 vagas:{" "}
      <span className="text-primary tabular-nums">300 ÷ 6 = 50 cada</span>
    </>
  ),
  7: <Verdict />,
  8: <Verdict />,
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

function Reveal({
  show,
  delay = 0,
  className,
  children,
}: {
  show: boolean
  delay?: number
  className?: string
  children: ReactNode
}) {
  const reduce = useReducedMotion()
  const hidden = {
    opacity: 0,
    transform: reduce ? "translateY(0px)" : "translateY(8px)",
  }
  return (
    <motion.div
      className={className}
      initial={hidden}
      animate={show ? { opacity: 1, transform: "translateY(0px)" } : hidden}
      transition={{ duration: 0.4, ease: EASE_OUT, delay: show ? delay : 0 }}
    >
      {children}
    </motion.div>
  )
}

function Caption({ step }: { step: number }) {
  const reduce = useReducedMotion()
  return (
    <div className="mt-4 grid min-h-10 place-items-center text-center text-sm">
      <AnimatePresence mode="wait" initial={false}>
        <motion.p
          key={Math.min(step, 7)}
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

function Grade({ b, step }: { b: Bimester; step: number }) {
  return b.known || step >= SOLVED_AT ? (
    <NumberFlow value={b.grade} />
  ) : (
    <span>?</span>
  )
}

function Copy({
  b,
  step,
  index,
}: {
  b: Bimester
  step: number
  index: number
}) {
  const reduce = useReducedMotion()
  const shown = step >= b.at
  const hidden = {
    opacity: 0,
    transform: reduce
      ? "translateY(0px) scale(1)"
      : "translateY(-8px) scale(0.95)",
  }
  return (
    <motion.div
      className={cn(
        "absolute -inset-0.5 grid place-items-center rounded-md border-2 bg-clip-padding font-medium text-xs tabular-nums",
        b.known
          ? "border-primary/30 bg-primary/25 text-foreground"
          : "border-primary bg-primary text-primary-foreground",
      )}
      initial={hidden}
      animate={
        shown ? { opacity: 1, transform: "translateY(0px) scale(1)" } : hidden
      }
      transition={{
        duration: 0.35,
        ease: EASE_OUT,
        delay: shown ? index * 0.08 : 0,
      }}
    >
      <Grade b={b} step={step} />
    </motion.div>
  )
}

export function CalcExplainer() {
  const { ref, step, done, run, replay } = useTimeline(STEPS)

  return (
    <div ref={ref} className="mx-auto w-full max-w-2xl">
      <div key={run}>
        <div className="grid grid-cols-4 gap-2">
          {BIMESTERS.map((b, i) => (
            <Reveal
              key={b.label}
              show={step >= 1}
              delay={i * 0.06}
              className={cn(
                "flex flex-col items-center gap-0.5 rounded-lg border-2 p-2",
                b.known ? "border-primary/30" : "border-primary",
              )}
            >
              <span className="text-muted-foreground text-xs">{b.label}</span>
              <span className="inline-flex items-baseline gap-1">
                <span
                  className={cn(
                    "font-semibold text-xl tabular-nums",
                    !b.known && "text-primary",
                  )}
                >
                  <Grade b={b} step={step} />
                </span>
                <span className="font-medium text-muted-foreground text-sm">
                  <Op />
                  {b.weight}
                </span>
              </span>
            </Reveal>
          ))}
        </div>

        <Reveal show={step >= 1} delay={0.3} className="mt-6">
          <div className="grid grid-cols-10 gap-1">
            {BIMESTERS.flatMap((b) =>
              Array.from({ length: b.weight }, (_, k) => (
                <div
                  key={`${b.label}-${k}`}
                  className={cn(
                    "relative h-10 rounded-md border-2 border-dashed transition-colors duration-300",
                    step >= b.at ? "border-transparent" : "border-primary/20",
                  )}
                  style={{
                    transitionDelay: step >= b.at ? `${k * 80}ms` : "0ms",
                  }}
                >
                  <Copy b={b} step={step} index={k} />
                </div>
              )),
            )}
          </div>
          <div className="mt-1.5 grid grid-cols-10 gap-1 text-center text-muted-foreground text-xs">
            {BIMESTERS.map((b) => (
              <div
                key={b.label}
                className="border-muted-foreground/40 border-t pt-1"
                style={{ gridColumn: `span ${b.weight}` }}
              >
                {b.label.replace(" Bim", "")} <Op />
                {b.weight}
              </div>
            ))}
          </div>
        </Reveal>

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
