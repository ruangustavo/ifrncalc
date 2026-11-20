"use server"

import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { notifyError } from "@/lib/notify"
import { toDisciplines } from "@/lib/suap/boletim"
import { meuBoletim, meusPeriodosLetivos } from "@/lib/suap/generated/client"

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

export interface SchoolPeriod {
  year: number
  term: number
}

export interface GetGradesResponse {
  success: boolean
  grades?: Discipline[]
  period?: SchoolPeriod
  message?: string
}

export async function getGrades(): Promise<GetGradesResponse> {
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

    const grades = toDisciplines(gradesResponse.data.results)

    return {
      success: true,
      grades,
      period: { year: anoLetivo, term: periodoLetivo },
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
