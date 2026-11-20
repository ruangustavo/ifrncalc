"use client"

import { PencilEdit02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useMemo, useState } from "react"

import type { Discipline } from "@/actions/get-grades"
import { cn } from "@/lib/utils"
import { useGradesStore } from "@/store/grades"
import { recalculateGrades } from "@/utils/grade-calculation"
import { gradeTier, TIER_BORDER, TIER_SURFACE } from "@/utils/grade-tier"
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
      <span className="font-bold tabular-nums">{view.value}</span>
    )

  if (compact) {
    const tile = cn(
      "flex h-14 flex-col items-center justify-center gap-1 rounded-2xl tabular-nums",
      view.kind === "needed" &&
        cn(
          "ring-1",
          TIER_SURFACE[gradeTier(view.value)],
          TIER_BORDER[gradeTier(view.value)],
        ),
      view.kind === "simulated" &&
        "border-2 border-dashed border-foreground/30 bg-card",
    )

    const tileBody = (
      <>
        {shortLabel && (
          <span className="text-xs leading-none font-medium opacity-70">
            {shortLabel}
          </span>
        )}
        <span
          className={cn(
            "flex items-center gap-1 text-lg leading-none",
            view.kind === "none" ? "text-muted-foreground" : "font-bold",
            (view.kind === "needed" || view.kind === "simulated") &&
              "font-extrabold",
          )}
        >
          {view.kind === "none" ? "—" : view.value}
          {canEdit && (
            <HugeiconsIcon
              strokeWidth={2.5}
              icon={PencilEdit02Icon}
              className="size-3.5 opacity-60"
            />
          )}
        </span>
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
              "transition-transform duration-150 ease-snap outline-none focus-visible:ring-3 focus-visible:ring-ring/50 active:scale-[0.96]",
            )}
          >
            {tileBody}
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
