"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

const STAGE_TO_WEIGHT: Record<number, number> = { 1: 2, 2: 2, 3: 3, 4: 3 }

interface Grade {
  nota: number | null
  faltas: number
}

interface PaginatedResponse<T> {
  results: T[]
  count: number
  next: string | null
  previous: string | null
}

interface StageGrade {
  grade: number | null
  isAvailable: boolean
  passingGrade: number
}

export interface Discipline {
  name: string
  E1: StageGrade
  E2: StageGrade
  E3: StageGrade
  E4: StageGrade
}

interface GetPeriodsResponse
  extends PaginatedResponse<{
    ano_letivo: number
    periodo_letivo: number
  }> {}

interface SUAPDiscipline {
  disciplina: string
  nota_etapa_1: Grade
  nota_etapa_2: Grade
  nota_etapa_3: Grade
  nota_etapa_4: Grade
  quantidade_avaliacoes: number
}

interface SUAPResponse extends PaginatedResponse<SUAPDiscipline> {}

interface GetGradesResponse {
  success: boolean
  grades?: Discipline[]
  message?: string
}

const getWeight = (
  currentIndex: number,
  numberOfAssessments: number,
): number => {
  const isSemester = numberOfAssessments === 2
  return isSemester
    ? currentIndex === 0
      ? 2
      : 3
    : STAGE_TO_WEIGHT[currentIndex + 1]
}

function calculatePassingGrade(
  grades: Grade[],
  numberOfAssessments: number,
): number {
  let totalWeightNull = 0
  let sumOfGradesNotNull = 0

  for (let i = 0; i < grades.length && i < numberOfAssessments; i++) {
    const currentStageGrade = grades[i]
    const weight = getWeight(i, numberOfAssessments)

    if (currentStageGrade.nota === null) {
      totalWeightNull += weight
    } else {
      sumOfGradesNotNull += currentStageGrade.nota * weight
    }
  }

  const weightAccordingToNumberOfAssessments = Array.from(
    { length: numberOfAssessments },
    (_, i) => getWeight(i, numberOfAssessments) || 0,
  ).reduce((sum, weight) => sum + weight, 0)

  const gradeNeededToPass =
    (60 * weightAccordingToNumberOfAssessments - sumOfGradesNotNull) /
    totalWeightNull
  return gradeNeededToPass < 0 ? 0 : Math.round(gradeNeededToPass)
}

function parseDisciplineName(discipline: string): string {
  return discipline.substring(11).replace(/\(.*\)/, "")
}

async function getPeriods(accessToken: string) {
  const response: GetPeriodsResponse = await fetch(
    `${process.env.SUAP_URL}/api/ensino/meus-periodos-letivos`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      next: {
        revalidate: 60 * 60 * 24, // 24 hours
      },
    },
  ).then((res) => res.json())

  return response.results
}

export async function getGrades(): Promise<GetGradesResponse> {
  const session = await getServerSession(authOptions)
  const accessToken = session?.accessToken

  if (!accessToken) {
    return { success: false, message: "Not authenticated" }
  }

  const periods = await getPeriods(accessToken)

  const period = periods[0]

  const response: SUAPResponse = await fetch(
    `${process.env.SUAP_URL}/api/ensino/meu-boletim/${period.ano_letivo}/${period.periodo_letivo}/`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      next: {
        revalidate: 60 * 60 * 6, // 6 hours
      },
    },
  ).then((res) => res.json())

  const grades: Discipline[] = response.results.map((discipline) => {
    const gradeToPass = calculatePassingGrade(
      [
        discipline.nota_etapa_1,
        discipline.nota_etapa_2,
        discipline.nota_etapa_3,
        discipline.nota_etapa_4,
      ],
      discipline.quantidade_avaliacoes,
    )

    const isAvailable = (grade: number | null, index: number) =>
      grade == null && index <= discipline.quantidade_avaliacoes

    const createStageGrade = (grade: Grade, index: number): StageGrade => ({
      grade: grade.nota,
      isAvailable: isAvailable(grade.nota, index),
      passingGrade: isAvailable(grade.nota, index)
        ? gradeToPass
        : discipline.quantidade_avaliacoes >= index
          ? 0
          : -1,
    })

    return {
      name: parseDisciplineName(discipline.disciplina),
      E1: createStageGrade(discipline.nota_etapa_1, 1),
      E2: createStageGrade(discipline.nota_etapa_2, 2),
      E3: createStageGrade(discipline.nota_etapa_3, 3),
      E4: createStageGrade(discipline.nota_etapa_4, 4),
    }
  })

  return {
    success: true,
    grades,
  }
}
