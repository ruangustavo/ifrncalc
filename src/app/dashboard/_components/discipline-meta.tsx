import type { Discipline } from "@/actions/get-grades"

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

  return (
    <p className="mt-0.5 text-sm font-normal text-muted-foreground">
      {discipline.hours}h
      {partialAverage !== null && ` · média parcial ${partialAverage}`}
    </p>
  )
}
