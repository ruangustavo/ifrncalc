import type { Discipline } from "@/actions/get-grades"
import { STAGE_KEYS } from "@/utils/grade-calculation"
import { formatGrade } from "@/utils/grade-format"

function calculatePartialAverage(discipline: Discipline) {
  const stages = [discipline.E1, discipline.E2, discipline.E3, discipline.E4]
  const filled = stages.filter((s) => s.grade !== null)

  if (filled.length === 0) return null
  const sum = filled.reduce((acc, s) => acc + (s.grade ?? 0), 0)

  return Math.round(sum / filled.length)
}

export function DisciplineMeta({ discipline }: { discipline: Discipline }) {
  const partialAverage =
    discipline.partialAverage ?? calculatePartialAverage(discipline)

  const hasAssessments = STAGE_KEYS.some(
    (key) =>
      discipline[key].passingGrade >= 0 || discipline[key].grade !== null,
  )

  const details = [
    discipline.hours > 0 && `${discipline.hours}h`,
    partialAverage !== null && `média parcial ${formatGrade(partialAverage)}`,
    !hasAssessments && "sem avaliações neste período",
  ].filter(Boolean)

  if (details.length === 0) return null

  return (
    <p className="mt-0.5 text-sm font-normal text-muted-foreground">
      {details.join(" · ")}
    </p>
  )
}
