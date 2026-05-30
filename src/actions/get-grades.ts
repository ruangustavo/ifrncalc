"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { notifyError } from "@/lib/notify"
import { meuBoletim, meusPeriodosLetivos } from "@/lib/suap/generated/client"
import type {
  BoletimSchema,
  NotaBoletimSchema,
} from "@/lib/suap/generated/models"

const STAGE_TO_WEIGHT: Record<number, number> = { 1: 2, 2: 2, 3: 3, 4: 3 }

interface StageGrade {
  grade: number | null
  isAvailable: boolean
  passingGrade: number
}

export interface Discipline {
  name: string
  hours: number
  partialAverage: number | null
  E1: StageGrade
  E2: StageGrade
  E3: StageGrade
  E4: StageGrade
}

export interface GetGradesResponse {
  success: boolean
  grades?: Discipline[]
  message?: string
}

interface Grade {
  nota: number | null
  faltas: number
}

interface NormalizedDiscipline {
  disciplina: string
  nota_etapa_1: Grade
  nota_etapa_2: Grade
  nota_etapa_3: Grade
  nota_etapa_4: Grade
  quantidade_avaliacoes: number
  carga_horaria: number
  media_disciplina: number | null
}

function resolveGrade(nota: NotaBoletimSchema | undefined): Grade {
  return { nota: nota?.nota ?? null, faltas: nota?.faltas ?? 0 }
}

function normalizeDiscipline(
  boletim: BoletimSchema,
): NormalizedDiscipline | null {
  if (!boletim.disciplina) return null

  return {
    disciplina: boletim.disciplina,
    nota_etapa_1: resolveGrade(boletim.nota_etapa_1),
    nota_etapa_2: resolveGrade(boletim.nota_etapa_2),
    nota_etapa_3: resolveGrade(boletim.nota_etapa_3),
    nota_etapa_4: resolveGrade(boletim.nota_etapa_4),
    quantidade_avaliacoes: boletim.quantidade_avaliacoes ?? 0,
    carga_horaria: boletim.carga_horaria ?? 0,
    media_disciplina: boletim.media_disciplina ?? null,
  }
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

export async function getGrades(): Promise<GetGradesResponse> {
  const isMockGrades = process.env.MOCK_GRADES === "true"

  const session = await getServerSession(authOptions)
  const accessToken = session?.accessToken

  if (!accessToken) {
    return {
      success: false,
      message:
        "Sua sessão expirou. Por favor, faça login novamente para continuar.",
    }
  }

  try {
    let anoLetivo: number
    let periodoLetivo: number

    if (isMockGrades) {
      // Skip period lookup and pin to a known historical period so the real
      // boletim pipeline (normalize + calculatePassingGrade) is exercised.
      anoLetivo = 2023
      periodoLetivo = 1
    } else {
      const periodsResponse = await meusPeriodosLetivos(undefined, {
        next: { revalidate: 60 * 60 * 24 }, // 24 hours
      })

      if (periodsResponse.status !== 200) {
        console.error(`Failed to fetch periods: ${periodsResponse.status}`)
        if (periodsResponse.status !== 401) {
          notifyError("get-grades / meusPeriodosLetivos", {
            code: `HTTP ${periodsResponse.status}`,
          })
        }
        return {
          success: false,
          message:
            "Não foi possível carregar seus dados acadêmicos. Sua sessão pode ter expirado. Por favor, faça login novamente.",
        }
      }

      const periods = periodsResponse.data.results

      if (periods.length === 0) {
        return {
          success: false,
          message:
            "Não foi possível carregar seus dados acadêmicos. Sua sessão pode ter expirado. Por favor, faça login novamente.",
        }
      }

      anoLetivo = periods[0].ano_letivo
      periodoLetivo = periods[0].periodo_letivo
    }

    const gradesResponse = await meuBoletim(
      anoLetivo,
      periodoLetivo,
      undefined,
      {
        next: { revalidate: 60 * 60 * 6 }, // 6 hours
      },
    )

    if (gradesResponse.status !== 200) {
      console.error(`Failed to fetch grades: ${gradesResponse.status}`)
      if (gradesResponse.status !== 401) {
        notifyError("get-grades / meuBoletim", {
          code: `HTTP ${gradesResponse.status}`,
        })
      }
      return {
        success: false,
        message:
          gradesResponse.status === 401
            ? "Sua sessão expirou. Por favor, faça login novamente para acessar suas notas."
            : "Erro ao carregar suas notas. Tente novamente em alguns instantes.",
      }
    }

    const grades: Discipline[] = gradesResponse.data.results
      .map(normalizeDiscipline)
      .filter(
        (discipline): discipline is NormalizedDiscipline => discipline !== null,
      )
      .map((discipline) => {
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
          hours: discipline.carga_horaria,
          partialAverage: discipline.media_disciplina,
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
  } catch (error) {
    console.error("Error in getGrades:", error)
    notifyError("get-grades / getGrades", {
      message: error instanceof Error ? error.message : String(error),
    })
    return {
      success: false,
      message:
        "Ocorreu um erro inesperado ao carregar suas notas. Por favor, tente fazer login novamente ou entre em contato com o suporte.",
    }
  }
}
