"use client"

import { motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

import { chipClass, type GroupProps, SOLVED_AT } from "./bimester"
import { EASE_IN_OUT, EASE_OUT, GAP_PX, MERGE_S } from "./motion"

// Copies drop in, then slide to the group's center on merge. They vanish only once the
// merged block fully covers them, so the group never goes blank mid-merge.
export function Copies({ b, step }: GroupProps) {
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
