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

export function CellTable({
  stage: { grade, isAvailable, passingGrade },
}: {
  stage: Stage
}) {
  const shouldShowGrade = isAvailable || grade !== null

  if (!shouldShowGrade) {
    return <span>-</span>
  }

  const hasPassingGrade = passingGrade >= 0 && !grade

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span
          className={cn(
            hasPassingGrade && 'font-medium',
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
  )
}
