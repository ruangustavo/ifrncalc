"use client"

import { Pencil } from "lucide-react"
import { useMemo, useState } from "react"
import type { Discipline } from "@/actions/get-grades"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useGradesStore } from "@/store/grades"
import { recalculateGrades } from "@/utils/grade-calculation"
import { mockDisciplineGrades } from "@/utils/mock-utils"
import { EditGradeModal } from "./edit-grade-modal"

export interface Stage {
  grade: number | null
  isAvailable: boolean
  passingGrade: number
}

export function GradeLabel({ grade, passingGrade, isAvailable }: Stage) {
  if (!isAvailable && grade === null) {
    return "—"
  }

  const hasPassingGrade = !grade && passingGrade >= 0

  return (
    <span
      className={cn(
        "font-medium text-xl tabular-nums md:text-base",
        hasPassingGrade && {
          "text-green-500": passingGrade <= 40,
          "text-yellow-500": passingGrade > 40 && passingGrade <= 90,
          "text-red-500": passingGrade > 90,
        },
      )}
    >
      {hasPassingGrade ? passingGrade : grade}
    </span>
  )
}

interface CellTableProps {
  stageKey: `E${number}`
  discipline: Discipline
  compact?: boolean
  shortLabel?: string
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

  const editedDisciplineGrades = editedGrades[discipline.name] ?? {}

  const recalculatedStages = useMemo(
    () => recalculateGrades(mockedDiscipline, editedDisciplineGrades),
    [mockedDiscipline, editedDisciplineGrades],
  )

  const currentStage =
    recalculatedStages[["E1", "E2", "E3", "E4"].indexOf(stageKey)]

  const displayGrade = editedDisciplineGrades[stageKey] ?? currentStage.grade

  const handleEdit = (newGrade: number) => {
    setGrade(discipline.name, stageKey, newGrade)
  }

  const hasMultipleAvailableStages =
    recalculatedStages.filter((stage) => stage.isAvailable).length > 1

  const canEdit = currentStage.isAvailable && hasMultipleAvailableStages

  if (compact) {
    const tileBody = (
      <>
        {shortLabel && (
          <span className="text-muted-foreground text-xs">{shortLabel}</span>
        )}
        <GradeLabel {...currentStage} grade={displayGrade} />
      </>
    )

    return (
      <>
        {canEdit ? (
          <button
            type="button"
            onClick={() => setIsEditModalOpen(true)}
            className="relative flex flex-col items-center gap-1 rounded-lg border p-2 transition-colors hover:bg-muted/50 active:bg-muted"
          >
            {tileBody}
            <Pencil className="absolute top-1.5 right-1.5 size-3 text-muted-foreground/60" />
          </button>
        ) : (
          <div className="flex flex-col items-center gap-1 rounded-lg border p-2">
            {tileBody}
          </div>
        )}
        <EditGradeModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={handleEdit}
          disciplineName={discipline.name}
          stage={stageKey}
        />
      </>
    )
  }

  if (!currentStage.isAvailable && currentStage.grade === null) {
    return <span className="text-muted-foreground">-</span>
  }

  return (
    <div className="flex items-center gap-2">
      <GradeLabel {...currentStage} grade={displayGrade} />

      {canEdit && (
        <Button
          variant="ghost"
          className="size-8 p-1.5 transition-colors duration-200 hover:bg-primary/10 active:bg-primary/20"
          onClick={() => setIsEditModalOpen(true)}
        >
          <Pencil className="size-4" />
        </Button>
      )}

      {editedDisciplineGrades[stageKey] !== undefined && (
        <Badge variant="secondary" className="animate-in font-medium">
          Editada
        </Badge>
      )}

      <EditGradeModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleEdit}
        disciplineName={discipline.name}
        stage={stageKey}
      />
    </div>
  )
}
