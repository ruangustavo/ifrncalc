"use client"

import { PencilEdit02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useMemo, useState } from "react"

import type { Discipline } from "@/actions/get-grades"
import { cn } from "@/lib/utils"
import { useGradesStore } from "@/store/grades"
import { recalculateGrades } from "@/utils/grade-calculation"
import { gradeTier, TIER_SURFACE } from "@/utils/grade-tier"
import { mockDisciplineGrades } from "@/utils/mock-utils"

import { EditGradeModal } from "./edit-grade-modal"

interface CellTableProps {
  stageKey: `E${number}`
  discipline: Discipline
  compact?: boolean
  shortLabel?: string
}

type CellView =
  | { kind: "none" }
  | { kind: "graded"; value: number }
  | { kind: "needed"; value: number }
  | { kind: "simulated"; value: number }

function describe(view: CellView) {
  if (view.kind === "needed") return `Precisa de ${view.value}`

  if (view.kind === "simulated") return `Nota simulada: ${view.value}`

  if (view.kind === "graded") return `Nota ${view.value}`

  return "Sem nota"
}

export function CellTable({
  stageKey,
  discipline,
  compact,
  shortLabel,
}: CellTableProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const { setGrade, editedGrades } = useGradesStore()

  const mockedDiscipline = useMemo(
    () =>
      process.env.NEXT_PUBLIC_SHOULD_MOCK === "true"
        ? mockDisciplineGrades(discipline)
        : discipline,
    [discipline],
  )

  const editedDisciplineGrades = editedGrades[discipline.name]

  const recalculatedStages = useMemo(
    () => recalculateGrades(mockedDiscipline, editedDisciplineGrades),
    [mockedDiscipline, editedDisciplineGrades],
  )

  const currentStage =
    recalculatedStages[["E1", "E2", "E3", "E4"].indexOf(stageKey)]

  const editedGrade = editedDisciplineGrades?.[stageKey]

  const view: CellView =
    editedGrade !== undefined
      ? { kind: "simulated", value: editedGrade }
      : currentStage.grade !== null
        ? { kind: "graded", value: currentStage.grade }
        : currentStage.isAvailable
          ? { kind: "needed", value: currentStage.passingGrade }
          : { kind: "none" }

  const handleEdit = (newGrade: number) => {
    setGrade(discipline.name, stageKey, newGrade)
  }

  const hasMultipleAvailableStages =
    recalculatedStages.filter((stage) => stage.isAvailable).length > 1

  const canEdit = currentStage.isAvailable && hasMultipleAvailableStages

  const modal = canEdit && (
    <EditGradeModal
      isOpen={isEditModalOpen}
      onClose={() => setIsEditModalOpen(false)}
      onSubmit={handleEdit}
      disciplineName={discipline.name}
      stage={stageKey}
    />
  )

  const value =
    view.kind === "none" ? (
      "—"
    ) : (
      <span
        className={cn(
          "tabular-nums",
          view.kind === "simulated"
            ? "font-bold"
            : "font-bold",
        )}
      >
        {view.value}
      </span>
    )

  if (compact) {
    const tile = cn(
      "relative flex min-h-18 flex-col items-center justify-center gap-1 rounded-2xl px-1 py-2.5 text-2xl",
      view.kind === "none" &&
        "border border-dashed border-foreground/15 text-muted-foreground",
      view.kind === "graded" && "bg-muted",
      view.kind === "needed" && TIER_SURFACE[gradeTier(view.value)],
      view.kind === "simulated" && "border border-dashed border-foreground/40",
    )

    const tileBody = (
      <>
        {shortLabel && (
          <span
            className={cn(
              "text-xs",
              view.kind === "needed" ? "text-foreground/70" : "text-muted-foreground",
            )}
          >
            {shortLabel}
          </span>
        )}
        <span className="flex h-7 items-center">{value}</span>
      </>
    )

    return (
      <>
        {canEdit ? (
          <button
            type="button"
            aria-label={`${shortLabel}. ${describe(view)}. Simular nota`}
            onClick={() => setIsEditModalOpen(true)}
            className={cn(
              tile,
              "transition-transform duration-150 ease-snap outline-none focus-visible:ring-3 focus-visible:ring-ring/50 active:scale-[0.97]",
            )}
          >
            {tileBody}
            <HugeiconsIcon
              strokeWidth={2}
              icon={PencilEdit02Icon}
              className="absolute top-1.5 right-1.5 size-3 opacity-50"
            />
          </button>
        ) : (
          <div className={tile}>{tileBody}</div>
        )}
        {modal}
      </>
    )
  }

  if (view.kind === "none") {
    return <span className="text-muted-foreground">—</span>
  }

  if (view.kind === "graded") {
    return <span className="text-lg">{value}</span>
  }

  const pill = cn(
    "inline-flex h-9 min-w-14 items-center justify-center gap-1.5 rounded-full px-3.5 text-lg",
    view.kind === "needed"
      ? TIER_SURFACE[gradeTier(view.value)]
      : "border border-dashed border-foreground/40",
  )

  if (!canEdit) {
    return <span className={pill}>{value}</span>
  }

  return (
    <>
      <button
        type="button"
        aria-label={`${describe(view)}. Simular nota`}
        onClick={() => setIsEditModalOpen(true)}
        className={cn(
          pill,
          "pr-2.5 transition-transform duration-150 ease-snap outline-none hover:scale-[1.04] focus-visible:ring-3 focus-visible:ring-ring/50 active:scale-[0.97]",
        )}
      >
        {value}
        <HugeiconsIcon
          strokeWidth={2}
          icon={PencilEdit02Icon}
          className="size-3.5 opacity-50"
        />
      </button>
      {modal}
    </>
  )
}
