"use client"

import { RotateLeft01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { motion, useReducedMotion } from "motion/react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { BIMESTERS } from "./bimester"
import { Caption } from "./caption"
import { Copies } from "./copies"
import { DashedSlots } from "./dashed-slots"
import { MergedBlock } from "./merged-block"
import { EASE_OUT } from "./motion"
import { useTimeline } from "./use-timeline"

const STEPS = [
  300, 1600, 1200, 2200, 900, 2000, 1600, 2400, 1600, 2200, 900,
] as const

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
              className={cn(
                "flex flex-col gap-1.5",
                b.weight === 3 ? "col-span-3" : "col-span-2",
              )}
            >
              <div className="relative h-10">
                <DashedSlots b={b} step={step} />
                <Copies b={b} step={step} />
                <MergedBlock b={b} step={step} />
              </div>
              <div className="flex flex-col items-center border-t border-muted-foreground/40 pt-1 text-xs leading-tight">
                <span className="text-muted-foreground">{b.label}</span>
                <span
                  className={cn(
                    "font-medium",
                    b.weight === 3 ? "text-highlight" : "text-muted-foreground",
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
              <HugeiconsIcon strokeWidth={2} icon={RotateLeft01Icon} />
              Ver de novo
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
