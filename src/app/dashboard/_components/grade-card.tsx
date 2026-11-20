"use client"

import { ArrowDown01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"

import type { Discipline } from "@/actions/get-grades"
import { cn } from "@/lib/utils"

import { CellTable } from "./cell-table"
import { DisciplineMeta } from "./discipline-meta"
import { STAGES } from "./stages"

export function GradeCard({ grade }: { grade: Discipline }) {
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <div className="rounded-3xl bg-card p-4 ring-1 ring-foreground/10">
      <button
        type="button"
        aria-expanded={isExpanded}
        className="flex w-full items-start gap-3 px-1 text-left"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="min-w-0 flex-1">
          <h3 className="text-xl leading-tight font-bold">
            {grade.name}
          </h3>
          <DisciplineMeta discipline={grade} />
        </div>
        <HugeiconsIcon
          strokeWidth={2}
          icon={ArrowDown01Icon}
          className={cn(
            "mt-1 size-5 shrink-0 text-muted-foreground transition-transform duration-200 ease-snap",
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
            <div className="grid grid-cols-4 gap-2 pt-4">
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
