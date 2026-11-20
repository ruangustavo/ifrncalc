import { cn } from "@/lib/utils"

import {
  type CalcResult,
  type GradeInput,
  isGradeDraft,
  isGradeOutOfRange,
} from "./calc-result"
import type { DisciplineType } from "./discipline"
import { TypeToggle } from "./type-toggle"
import { WeightStepper } from "./weight-stepper"

interface GradeGridProps {
  disciplineType: DisciplineType
  onTypeChange: (type: DisciplineType) => void
  grades: GradeInput[]
  onGradeChange: (index: number, value: string) => void
  onWeightChange: (index: number, weight: number) => void
  onClear: () => void
  result: CalcResult
}

export function GradeGrid({
  disciplineType,
  onTypeChange,
  grades,
  onGradeChange,
  onWeightChange,
  onClear,
  result,
}: GradeGridProps) {
  return (
    <div className="mt-3 overflow-hidden rounded-3xl bg-card ring-1 ring-foreground/10">
      <div className="flex items-center justify-between gap-3 border-b p-3">
        <TypeToggle value={disciplineType} onChange={onTypeChange} />
        <button
          type="button"
          onClick={onClear}
          disabled={result.kind === "empty"}
          className="mr-2 rounded-md text-sm font-medium whitespace-nowrap text-muted-foreground underline-offset-4 transition duration-150 ease-out outline-none hover:text-foreground hover:underline focus-visible:ring-2 focus-visible:ring-foreground/60 disabled:pointer-events-none disabled:opacity-0"
        >
          Limpar notas
        </button>
      </div>
      <div className="grid grid-cols-2">
        {grades.map((grade, index) => (
          <div
            key={index}
            className={cn(
              "flex flex-col gap-2 p-4 transition-colors duration-150 ease-out has-[input:focus]:bg-muted/50 sm:p-5",
              index % 2 === 0 && "border-r",
              index < grades.length - 2 && "border-b",
            )}
          >
            <label htmlFor={`grade-${index}`} className="text-sm font-semibold">
              Nota {index + 1}
            </label>
            <input
              id={`grade-${index}`}
              type="text"
              inputMode="decimal"
              autoComplete="off"
              placeholder="—"
              value={grade.value}
              aria-invalid={isGradeOutOfRange(grade.value)}
              onChange={(event) => {
                if (isGradeDraft(event.target.value))
                  onGradeChange(index, event.target.value)
              }}
              className="w-full min-w-0 bg-transparent text-4xl leading-none font-extrabold tracking-tight tabular-nums transition-colors duration-150 ease-out outline-none placeholder:text-foreground/20 aria-invalid:text-destructive"
            />
            <WeightStepper
              index={index}
              weight={grade.weight}
              onChange={onWeightChange}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
