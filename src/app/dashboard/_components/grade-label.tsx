import { cn } from "@/lib/utils"

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
        "text-xl font-medium tabular-nums md:text-base",
        hasPassingGrade && {
          "text-success": passingGrade <= 40,
          "text-warning": passingGrade > 40 && passingGrade <= 90,
          "text-danger": passingGrade > 90,
        },
      )}
    >
      {hasPassingGrade ? passingGrade : grade}
    </span>
  )
}
