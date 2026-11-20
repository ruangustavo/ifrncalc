import type { Discipline } from "@/actions/get-grades"

const PASSING_AVERAGE = 60
const FINAL_EXAM_FLOOR = 20
const ANNUAL_WEIGHTS = [2, 2, 3, 3]
const SEMESTER_WEIGHTS = [2, 3]

export interface Stage {
  grade: number
  weight: number
}

export type FinalExamOutlook =
  | { kind: "approved"; average: number }
  | { kind: "failed"; average: number }
  | { kind: "exam"; average: number; needed: number; replaces: number | null }

export function finalExamOutlook(stages: Stage[]): FinalExamOutlook {
  const totalWeight = stages.reduce((sum, stage) => sum + stage.weight, 0)

  const weightedSum = stages.reduce(
    (sum, stage) => sum + stage.grade * stage.weight,
    0,
  )

  const average = weightedSum / totalWeight

  if (average >= PASSING_AVERAGE) return { kind: "approved", average }

  if (average < FINAL_EXAM_FLOOR) return { kind: "failed", average }

  const averagedWithExam = 2 * PASSING_AVERAGE - average

  return stages.reduce<FinalExamOutlook & { kind: "exam" }>(
    (best, stage, index) => {
      const needed =
        (PASSING_AVERAGE * totalWeight -
          (weightedSum - stage.grade * stage.weight)) /
        stage.weight

      return needed < best.needed
        ? { kind: "exam", average, needed, replaces: index }
        : best
    },
    { kind: "exam", average, needed: averagedWithExam, replaces: null },
  )
}

export function disciplineOutlook(
  discipline: Discipline,
): FinalExamOutlook | null {
  if (discipline.finalExamGrade !== null) return null

  const existing = [
    discipline.E1,
    discipline.E2,
    discipline.E3,
    discipline.E4,
  ].filter((stage) => stage.passingGrade >= 0)

  const weights = existing.length === 2 ? SEMESTER_WEIGHTS : ANNUAL_WEIGHTS
  const stages: Stage[] = []

  for (const [index, stage] of existing.entries()) {
    if (stage.grade === null) return null

    stages.push({ grade: stage.grade, weight: weights[index] })
  }

  return stages.length === 0 ? null : finalExamOutlook(stages)
}
