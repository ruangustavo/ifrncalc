'use server'

import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'

const isFebruary = new Date().getMonth() >= 1
const currentYear = isFebruary
  ? new Date().getFullYear()
  : new Date().getFullYear() - 1

const STAGE_TO_WEIGHT: Record<number, number> = { 1: 2, 2: 2, 3: 3, 4: 3 }

interface Grade {
  nota: number | null
  faltas: number
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

interface SUAPResponse {
  disciplina: string
  nota_etapa_1: Grade
  nota_etapa_2: Grade
  nota_etapa_3: Grade
  nota_etapa_4: Grade
  quantidade_avaliacoes: number
}

interface GetGradesResponse {
  success: boolean
  grades?: Discipline[]
  message?: string
}

const getWeight = (
  currentIndex: number,
  numberOfAssessments: number
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
  numberOfAssessments: number
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
    (_, i) => getWeight(i, numberOfAssessments) || 0
  ).reduce((sum, weight) => sum + weight, 0)

  const gradeNeededToPass =
    (60 * weightAccordingToNumberOfAssessments - sumOfGradesNotNull) /
    totalWeightNull
  return gradeNeededToPass < 0 ? 0 : Math.round(gradeNeededToPass)
}

function parseDisciplineName(discipline: string): string {
  return discipline.substring(11).replace(/\(.*\)/, '')
}

export async function getGrades(): Promise<GetGradesResponse> {
  const session = await getServerSession(authOptions)
  const accessToken = session?.accessToken

  if (!accessToken) {
    return { success: false, message: 'Not authenticated' }
  }

  const response: SUAPResponse[] = await fetch(
    `${process.env.SUAP_URL}/api/v2/minhas-informacoes/boletim/${currentYear}/1/`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      next: {
        revalidate: 60 * 60 * 6, // 6 hours
      },
    }
  ).then(res => res.json())

  const grades: Discipline[] = response.map(discipline => {
    const gradeToPass = calculatePassingGrade(
      [
        discipline.nota_etapa_1,
        discipline.nota_etapa_2,
        discipline.nota_etapa_3,
        discipline.nota_etapa_4,
      ],
      discipline.quantidade_avaliacoes
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
