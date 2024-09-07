import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Stage } from './columns'
import { cn } from '@/lib/utils'

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
        hasPassingGrade && getGradeClassname(passingGrade),
      )}
    >
      {hasPassingGrade ? passingGrade : grade}
    </span>
  )
}

export function CellTable({
  stage: { grade, isAvailable, passingGrade },
}: {
  stage: Stage
}) {
  const shouldShowGrade = isAvailable || grade !== null

  if (!shouldShowGrade) {
    return <span>-</span>
  }

  const hasPassingGrade = checkIfHasPassingGrade({ grade, passingGrade })

  return hasPassingGrade ? (
    <Tooltip>
      <TooltipTrigger asChild>
        <span
          className={cn(
            'font-mono tabular-nums',
            hasPassingGrade && getGradeClassname(passingGrade),
          )}
        >
          {grade ?? passingGrade}
        </span>
      </TooltipTrigger>
      <TooltipContent className="border-foreground/5">
        Você precisa de {grade ?? passingGrade} para passar
      </TooltipContent>
    </Tooltip>
  ) : (
    <span className="font-mono tabular-nums">{grade}</span>
  )
}
