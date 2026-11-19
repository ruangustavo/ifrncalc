import type { Discipline } from "@/actions/get-grades"

type Grades = [number | null, number | null, number | null, number | null]

function stage(grade: number | null, index: number, assessments: number) {
  const isAssessed = index < assessments

  return {
    grade,
    isAvailable: isAssessed && grade === null,
    passingGrade: isAssessed ? 0 : -1,
  }
}

function discipline(
  name: string,
  hours: number,
  assessments: number,
  grades: Grades,
): Discipline {
  const [e1, e2, e3, e4] = grades

  return {
    name,
    hours,
    partialAverage: null,
    E1: stage(e1, 0, assessments),
    E2: stage(e2, 1, assessments),
    E3: stage(e3, 2, assessments),
    E4: stage(e4, 3, assessments),
  }
}

export const DEMO_IRA = "78.5"

export const DEMO_GRADES: Discipline[] = [
  discipline("Matemática", 120, 4, [72, 65, null, null]),
  discipline("Física", 120, 4, [45, 40, 50, null]),
  discipline("Programação Web", 90, 2, [90, null, null, null]),
]
