import type { Discipline } from '@/actions/get-grades'

export function mockDisciplineGrades(discipline: Discipline): Discipline {
  const stages = ['E1', 'E2', 'E3', 'E4'] as const

  return {
    ...discipline,
    ...stages.reduce(
      (acc, stage) => {
        const currentStage = discipline[stage]
        const MOCKED_GRADE = 60

        acc[stage] = {
          ...currentStage,
          grade:
            !currentStage.isAvailable && currentStage.passingGrade >= 0
              ? MOCKED_GRADE
              : currentStage.grade,
        }
        return acc
      },
      {} as Record<
        (typeof stages)[number],
        (typeof discipline)[(typeof stages)[number]]
      >
    ),
  }
}
