import type { Discipline } from "@/actions/get-grades"
import { cn } from "@/lib/utils"
import {
  STAGE_KEYS,
  type SimulationOutcome,
  type StageKey,
} from "@/utils/grade-calculation"

import { STAGES } from "./stages"

interface SimulationTilesProps {
  discipline: Discipline
  editedGrades: Record<string, number>
  stage: StageKey
  grade: number
  outcome: SimulationOutcome
}

function neededLabel(outcome: SimulationOutcome) {
  if (outcome.kind === "secured") return "0"

  if (outcome.kind === "impossible") return "+100"

  if (outcome.kind === "needed") return String(outcome.needed)

  return "—"
}

export function SimulationTiles({
  discipline,
  editedGrades,
  stage,
  grade,
  outcome,
}: SimulationTilesProps) {
  const open = outcome.kind === "final" ? [] : outcome.stages

  return (
    <div className="grid grid-cols-4 gap-2">
      {STAGE_KEYS.map((key, index) => {
        const isChosen = key === stage
        const isOpen = open.includes(key)

        const value = isChosen
          ? String(grade)
          : isOpen
            ? neededLabel(outcome)
            : String(editedGrades[key] ?? discipline[key].grade ?? "—")

        return (
          <div
            key={key}
            className={cn(
              "flex h-14 flex-col items-center justify-center gap-1 rounded-2xl text-lg leading-none tabular-nums",
              !isChosen && !isOpen && "font-semibold text-muted-foreground",
              isChosen &&
                "border-2 border-dashed border-foreground/30 font-extrabold",
              isOpen && "bg-card font-extrabold ring-1 ring-foreground/15",
            )}
          >
            <span className="text-xs leading-none font-medium opacity-70">
              {STAGES[index].shortLabel}
            </span>
            {value}
          </div>
        )
      })}
    </div>
  )
}
