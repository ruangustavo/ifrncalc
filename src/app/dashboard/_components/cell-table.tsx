"use client"

import { motion } from "framer-motion"
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
    return "-"
  }

  const hasPassingGrade = !grade && passingGrade >= 0

  return (
    <span
      className={cn(
        "font-mono text-base tabular-nums",
        hasPassingGrade && {
          "font-medium text-green-500": passingGrade <= 40,
          "font-medium text-yellow-500": passingGrade <= 90,
          "font-medium text-red-500": passingGrade > 90,
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
}

export function CellTable({ stageKey, discipline }: CellTableProps) {
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

  if (!currentStage.isAvailable && currentStage.grade === null) {
    return <span className="text-muted-foreground">-</span>
  }

  const hasMultipleAvailableStages =
    recalculatedStages.filter((stage) => stage.isAvailable).length > 1

  return (
    <div className="flex items-center gap-2">
      <GradeLabel {...currentStage} grade={displayGrade} />

      {currentStage.isAvailable && hasMultipleAvailableStages && (
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
