import type { Discipline } from "@/actions/get-grades"

const MOCKED_GRADE = 60

function mockStage(stage: Discipline["E1"]): Discipline["E1"] {
  return {
    ...stage,
    grade:
      !stage.isAvailable && stage.passingGrade >= 0
        ? MOCKED_GRADE
        : stage.grade,
  }
}

export function mockDisciplineGrades(discipline: Discipline): Discipline {
  return {
    ...discipline,
    E1: mockStage(discipline.E1),
    E2: mockStage(discipline.E2),
    E3: mockStage(discipline.E3),
    E4: mockStage(discipline.E4),
  }
}
