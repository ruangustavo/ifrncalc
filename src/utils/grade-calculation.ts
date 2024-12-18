import type { Discipline } from '@/actions/get-grades'

const STAGE_TO_WEIGHT: Record<number, number> = { 1: 2, 2: 2, 3: 3, 4: 3 }

export function getWeight(
  currentIndex: number,
  numberOfAssessments: number
): number {
  const isSemester = numberOfAssessments === 2
  return isSemester
    ? currentIndex === 0
      ? 2
      : 3
    : STAGE_TO_WEIGHT[currentIndex + 1]
}

export function recalculateGrades(
  discipline: Discipline,
  editedGrades: Record<string, number> = {}
) {
  const stages = ['E1', 'E2', 'E3', 'E4'] as const
  const numberOfAssessments = stages.reduce(
    (count, stage) => (discipline[stage].passingGrade >= 0 ? count + 1 : count),
    0
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
          Math.round((60 * totalWeight - sumOfGradesNotNull) / totalWeightNull)
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
