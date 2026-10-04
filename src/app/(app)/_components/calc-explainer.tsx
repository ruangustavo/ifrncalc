"use client"

import NumberFlow from "@number-flow/react"
import { animate, motion, useInView, useReducedMotion } from "framer-motion"
import {
  ArrowRight,
  Check,
  Divide,
  Dot,
  type LucideIcon,
  RotateCcw,
  X,
} from "lucide-react"
import { type ReactNode, useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const EASE_OUT = [0.23, 1, 0.32, 1] as const
const EASE_IN_OUT = [0.77, 0, 0.175, 1] as const

const STEPS = [300, 1100, 1100, 1200, 1200, 1400, 800, 900] as const

function Op({ icon: Icon }: { icon: LucideIcon }) {
  return <Icon className="inline size-3 align-[-0.125em]" />
}

const SEGMENTS = [
  {
    label: "E1",
    left: 0,
    pts: 140,
    caption: (
      <>
        70 <Op icon={X} /> 2
      </>
    ),
    known: true,
    at: 2,
  },
  {
    label: "E2",
    left: 140,
    pts: 160,
    caption: (
      <>
        80 <Op icon={X} /> 2
      </>
    ),
    known: true,
    at: 3,
  },
  {
    label: "E3",
    left: 300,
    pts: 150,
    caption: (
      <>
        150 <Op icon={Divide} /> 3 = 50
      </>
    ),
    known: false,
    at: 6,
  },
  {
    label: "E4",
    left: 450,
    pts: 150,
    caption: (
      <>
        150 <Op icon={Divide} /> 3 = 50
      </>
    ),
    known: false,
    at: 7,
  },
] as const

const GRID_COLUMNS = SEGMENTS.map((s) => `minmax(0, ${s.pts}fr)`).join(" ")
const CLIP_HIDDEN = "inset(0% 100% 0% 0%)"
const CLIP_SHOWN = "inset(0% 0% 0% 0%)"

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
  className,
  children,
}: {
  show: boolean
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
      transition={{ duration: 0.4, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  )
}

// Dashes are stroke-dasharray on paths placed in px, so the pattern never re-flows.
// Each half = an outer "C" (top/outer corner/side/bottom) + an inner edge, all anchored at the
// vertical center line. Progress p: 0→1 grows the inner edge from the center, 1→2 pulls the
// halves 2px apart and rounds the inner corners. Dash offsets compensate for moved path starts.
const STROKE = 1.5
const RADIUS = 4 - STROKE / 2
const DASH = 6
const DASH_GAP = 4
const PHASE = DASH + DASH_GAP / 2

function halfPaths(w: number, h: number, p: number) {
  const reveal = Math.min(p, 1)
  const round = Math.max(p - 1, 0)
  const y0 = STROKE / 2
  const y1 = h - STROKE / 2
  const x0 = STROKE / 2
  const mid = h / 2
  const xi = w / 2 - (1 + STROKE / 2) * round
  const ri = RADIUS * round
  const xe = xi - ri
  return {
    outer: [
      `M ${xe} ${y0} H ${x0 + RADIUS} A ${RADIUS} ${RADIUS} 0 0 0 ${x0} ${y0 + RADIUS} V ${mid}`,
      `M ${xe} ${y1} H ${x0 + RADIUS} A ${RADIUS} ${RADIUS} 0 0 1 ${x0} ${y1 - RADIUS} V ${mid}`,
    ],
    inner: [
      `M ${xi} ${mid} V ${mid - reveal * (mid - y0 - ri)} a ${ri} ${ri} 0 0 0 ${-ri} ${-ri}`,
      `M ${xi} ${mid} V ${mid + reveal * (y1 - ri - mid)} a ${ri} ${ri} 0 0 1 ${-ri} ${ri}`,
    ],
    outerOffset: PHASE + (w / 2 - xe),
  }
}

function DashedSplit({ step }: { step: number }) {
  const split = step >= 5
  const ref = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ w: 0, h: 0 })
  const [p, setP] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      if (entry)
        setSize({ w: entry.contentRect.width, h: entry.contentRect.height })
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    if (!split) {
      setP(0)
      return
    }
    const controls = animate(0, 2, {
      duration: 0.6,
      ease: "easeInOut",
      onUpdate: setP,
    })
    return () => controls.stop()
  }, [split])

  const { w, h } = size
  const paths = halfPaths(w, h, p)
  const half = (
    <>
      {paths.outer.map((d, i) => (
        <path
          key={`outer-${i === 0 ? "top" : "bottom"}`}
          d={d}
          strokeDashoffset={paths.outerOffset}
        />
      ))}
      {paths.inner.map((d, i) => (
        <path
          key={`inner-${i === 0 ? "top" : "bottom"}`}
          d={d}
          strokeDashoffset={PHASE}
        />
      ))}
    </>
  )

  return (
    <motion.div
      className="relative col-span-2 col-start-3 row-start-1"
      initial={{ opacity: 0 }}
      animate={{ opacity: step >= 4 && step <= 7 ? 1 : 0 }}
      transition={{ duration: 0.3, ease: EASE_OUT }}
    >
      <div ref={ref} className="absolute inset-0">
        {w > 0 && (
          <svg
            width={w}
            height={h}
            className="absolute inset-0 text-primary opacity-60"
            fill="none"
            stroke="currentColor"
            strokeWidth={STROKE}
            strokeDasharray={`${DASH} ${DASH_GAP}`}
            aria-hidden="true"
          >
            <g>{half}</g>
            <g transform={`translate(${w} 0) scale(-1 1)`}>{half}</g>
          </svg>
        )}
      </div>
      <motion.span
        className="absolute inset-0 grid place-items-center font-medium text-primary text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: step === 4 ? 1 : 0 }}
        transition={{ duration: 0.2, ease: EASE_OUT }}
      >
        faltam 300 pts
      </motion.span>
    </motion.div>
  )
}

export function CalcExplainer() {
  const { ref, step, done, run, replay } = useTimeline(STEPS)
  const reduce = useReducedMotion()

  return (
    <div ref={ref} className="mx-auto w-full max-w-2xl">
      <div key={run}>
        <Reveal
          show={step >= 1}
          className="mb-3 flex items-baseline justify-between text-sm"
        >
          <span className="inline-flex items-center text-muted-foreground">
            Matemática <Dot className="size-4" /> 4 etapas
          </span>
          <span>
            Meta:{" "}
            <span className="font-medium tabular-nums">
              60 <Op icon={X} /> 10 = 600 pts
            </span>
          </span>
        </Reveal>

        <Reveal show={step >= 1}>
          <div
            className="grid h-14 gap-0.5 rounded-lg border-2 border-primary/30 bg-muted/30 p-0.5"
            style={{ gridTemplateColumns: GRID_COLUMNS }}
          >
            <DashedSplit step={step} />

            {SEGMENTS.map((s, i) => (
              <motion.div
                key={s.label}
                className={cn(
                  "row-start-1 grid place-items-center rounded-sm font-medium text-xs",
                  s.known
                    ? "bg-primary/25 text-foreground"
                    : "bg-primary text-primary-foreground",
                )}
                style={{ gridColumnStart: i + 1 }}
                initial={{ clipPath: CLIP_HIDDEN }}
                animate={{ clipPath: step >= s.at ? CLIP_SHOWN : CLIP_HIDDEN }}
                transition={{ duration: reduce ? 0 : 0.7, ease: EASE_IN_OUT }}
              >
                <span className="inline-flex items-center">
                  {s.label} <Dot className="size-4" />
                  <NumberFlow value={step >= s.at ? s.pts : 0} />
                </span>
              </motion.div>
            ))}
          </div>
        </Reveal>

        <div
          className="mt-2 grid gap-0.5 px-1 text-center text-xs"
          style={{ gridTemplateColumns: GRID_COLUMNS }}
        >
          {SEGMENTS.map((s, i) => (
            <div
              key={s.label}
              className="row-start-1"
              style={{ gridColumnStart: i + 1 }}
            >
              <Reveal
                show={step >= s.at}
                className={
                  s.known ? "text-muted-foreground" : "font-medium text-primary"
                }
              >
                {s.caption}
              </Reveal>
            </div>
          ))}
          <Reveal
            show={step === 5}
            className="col-span-2 col-start-3 row-start-1 text-muted-foreground"
          >
            peso 3 + peso 3 <ArrowRight className="inline size-3" /> metade cada
          </Reveal>
        </div>

        <Reveal
          show={step >= 8}
          className="mt-2 text-center font-medium text-sm"
        >
          Precisa de <span className="text-primary">50</span> em E3 e E4{" "}
          <ArrowRight className="inline size-4" /> média{" "}
          <span className="text-green-600">
            60 <Check className="inline size-4" />
          </span>
        </Reveal>
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
