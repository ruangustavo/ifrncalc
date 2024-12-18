'use client'

import type { Discipline } from '@/actions/get-grades'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useGradesStore } from '@/store/grades'
import { recalculateGrades } from '@/utils/grade-calculation'
import { Pencil } from 'lucide-react'
import { useMemo, useState } from 'react'
import { EditGradeModal } from './edit-grade-modal'

export interface Stage {
  grade: number | null
  isAvailable: boolean
  passingGrade: number
}

function getGradeClassname(grade: number) {
  if (grade <= 40) {
    return 'text-green-500'
  }

  if (grade <= 90) {
    return 'text-yellow-500'
  }

  return 'text-red-500'
}

function checkIfHasPassingGrade({
  grade,
  passingGrade,
}: Omit<Stage, 'isAvailable'>) {
  return !grade && passingGrade >= 0
}

export function getGradeOrPassingGrade({
  grade,
  passingGrade,
  isAvailable,
}: Stage) {
  if (!isAvailable && grade === null) {
    return '-'
  }

  const hasPassingGrade = checkIfHasPassingGrade({ grade, passingGrade })

  return (
    <span
      className={cn(
        'font-mono tabular-nums',
        hasPassingGrade && getGradeClassname(passingGrade)
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

  const editedDisciplineGrades = editedGrades[discipline.name] ?? {}

  const recalculatedStages = useMemo(
    () => recalculateGrades(discipline, editedDisciplineGrades),
    [discipline, editedDisciplineGrades]
  )

  const currentStage =
    recalculatedStages[['E1', 'E2', 'E3', 'E4'].indexOf(stageKey)]
  const displayGrade = editedDisciplineGrades[stageKey] ?? currentStage.grade

  const handleEdit = (newGrade: number) => {
    setGrade(discipline.name, stageKey, newGrade)
  }

  if (!currentStage.isAvailable && currentStage.grade === null) {
    return <span>-</span>
  }

  return (
    <div className="flex items-center gap-2">
      {getGradeOrPassingGrade({
        ...currentStage,
        grade: displayGrade,
      })}

      {currentStage.isAvailable && (
        <Button
          variant="ghost"
          className="size-6 p-0 md:size-8 md:p-1"
          onClick={() => setIsEditModalOpen(true)}
        >
          <Pencil className="size-4" />
        </Button>
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
