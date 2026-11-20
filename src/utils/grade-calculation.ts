import type { Discipline } from "@/actions/get-grades"

const BIMESTER_WEIGHTS = [2, 2, 3, 3]

function getWeight(currentIndex: number, numberOfAssessments: number): number {
  const isSemester = numberOfAssessments === 2

  return isSemester
    ? currentIndex === 0
      ? 2
      : 3
    : BIMESTER_WEIGHTS[currentIndex]
}

export function recalculateGrades(
  discipline: Discipline,
  editedGrades: Record<string, number> = {},
) {
  const stages = ["E1", "E2", "E3", "E4"] as const

  const numberOfAssessments = stages.reduce(
    (count, stage) => (discipline[stage].passingGrade >= 0 ? count + 1 : count),
    0,
  )

  let totalWeightNull = 0
  let sumOfGradesNotNull = 0

  stages.forEach((stage, index) => {
    if (index >= numberOfAssessments) return

    const weight = getWeight(index, numberOfAssessments)
    const editedGrade = editedGrades[stage]
    const originalGrade = discipline[stage].grade

    if (editedGrade !== undefined) {
      sumOfGradesNotNull += editedGrade * weight
    } else if (originalGrade === null) {
      totalWeightNull += weight
    } else {
      sumOfGradesNotNull += originalGrade * weight
    }
  })

  const totalWeight = stages
    .slice(0, numberOfAssessments)
    .reduce((sum, _, index) => sum + getWeight(index, numberOfAssessments), 0)

  const gradeNeededToPass =
    totalWeightNull === 0
      ? 0
      : Math.max(
          0,
          Math.round((60 * totalWeight - sumOfGradesNotNull) / totalWeightNull),
        )

  return stages.map((stage, index) => ({
    ...discipline[stage],
    passingGrade:
      index < numberOfAssessments
        ? editedGrades[stage] === undefined && discipline[stage].grade === null
          ? gradeNeededToPass
          : 0
        : -1,
  }))
}

export type StageKey = "E1" | "E2" | "E3" | "E4"

export const STAGE_KEYS: StageKey[] = ["E1", "E2", "E3", "E4"]

export type SimulationOutcome =
  | { kind: "needed"; needed: number; stages: StageKey[] }
  | { kind: "secured"; stages: StageKey[] }
  | { kind: "impossible"; needed: number; stages: StageKey[] }
  | { kind: "final"; average: number }

export function neededAt(
  discipline: Discipline,
  editedGrades: Record<string, number>,
  stage: StageKey,
) {
  const { [stage]: _ignored, ...others } = editedGrades

  return recalculateGrades(discipline, others)[STAGE_KEYS.indexOf(stage)]
    .passingGrade
}

export function simulateGrade(
  discipline: Discipline,
  editedGrades: Record<string, number>,
  stage: StageKey,
  grade: number,
): SimulationOutcome {
  const next = { ...editedGrades, [stage]: grade }
  const recalculated = recalculateGrades(discipline, next)

  const open = STAGE_KEYS.filter(
    (key, index) =>
      next[key] === undefined &&
      discipline[key].grade === null &&
      recalculated[index].passingGrade >= 0,
  )

  if (open.length === 0) {
    const assessed = STAGE_KEYS.filter(
      (_, index) => recalculated[index].passingGrade >= 0,
    )

    const weights = assessed.map((_, index) =>
      getWeight(index, assessed.length),
    )

    const total = assessed.reduce(
      (sum, key, index) =>
        sum + (next[key] ?? discipline[key].grade ?? 0) * weights[index],
      0,
    )

    return {
      kind: "final",
      average: total / weights.reduce((a, b) => a + b, 0),
    }
  }

  const needed = recalculated[STAGE_KEYS.indexOf(open[0])].passingGrade

  if (needed === 0) return { kind: "secured", stages: open }

  if (needed > 100) return { kind: "impossible", needed, stages: open }

  return { kind: "needed", needed, stages: open }
}
