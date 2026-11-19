"use client"

import { AnimatePresence, motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { useState } from "react"

import type { Discipline } from "@/actions/get-grades"
import { cn } from "@/lib/utils"

import { CellTable } from "./cell-table"
import { STAGES } from "./stages"

function calculatePartialAverage(discipline: Discipline) {
  const stages = [discipline.E1, discipline.E2, discipline.E3, discipline.E4]
  const filled = stages.filter((s) => s.grade !== null)

  if (filled.length === 0) return null
  const sum = filled.reduce((acc, s) => acc + (s.grade ?? 0), 0)

  return Math.round(sum / filled.length)
}

export function GradeCard({ grade }: { grade: Discipline }) {
  const [isExpanded, setIsExpanded] = useState(true)

  const partialAverage = grade.partialAverage ?? calculatePartialAverage(grade)

  return (
    <div className="rounded-xl border bg-card p-4">
      <button
        type="button"
        className="flex w-full items-start gap-3"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div
          className={cn(
            "mt-1 h-10 w-1.5 shrink-0 rounded-full",
            partialAverage === null
              ? "bg-primary"
              : {
                  "bg-success": partialAverage >= 60,
                  "bg-warning": partialAverage >= 40 && partialAverage < 60,
                  "bg-danger": partialAverage < 40,
                },
          )}
        />
        <div className="min-w-0 flex-1 text-left">
          <h3 className="leading-tight font-semibold">{grade.name}</h3>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {grade.hours}h
            {partialAverage !== null && ` • Média parcial: ${partialAverage}`}
          </p>
        </div>
        <ChevronDown
          className={cn(
            "mt-1 size-5 shrink-0 text-muted-foreground transition-transform",
            isExpanded && "rotate-180",
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="mt-3 grid grid-cols-4 gap-2">
              {STAGES.map(({ key, shortLabel }) => (
                <CellTable
                  key={key}
                  discipline={grade}
                  stageKey={key}
                  shortLabel={shortLabel}
                  compact
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
