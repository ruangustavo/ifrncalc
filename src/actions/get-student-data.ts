"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { notifyError } from "@/lib/notify"

interface SUAPStudentData {
  ira: string
  periodo_referencia: number
  curso: string
  qtd_periodos: number
  situacao: string
}

export interface GetStudentDataResponse {
  success: boolean
  ira?: string
  message?: string
}

export async function getStudentData(): Promise<GetStudentDataResponse> {
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
    const response = await fetch(
      `${process.env.SUAP_URL}/api/ensino/meus-dados-aluno/`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        next: {
          revalidate: 60 * 60 * 6, // 6 hours
        },
      },
    )

    if (!response.ok) {
      console.error(
        `Failed to fetch student data: ${response.status} ${response.statusText}`,
      )
      if (response.status !== 401) {
        notifyError("get-student-data / meus-dados-aluno", {
          code: `HTTP ${response.status}`,
          message: response.statusText,
        })
      }
      return {
        success: false,
        message:
          response.status === 401
            ? "Sua sessão expirou. Por favor, faça login novamente."
            : "Erro ao carregar seus dados acadêmicos.",
      }
    }

    const data: SUAPStudentData = await response.json()

    return {
      success: true,
      ira: data.ira,
    }
  } catch (error) {
    console.error("Error in getStudentData:", error)
    notifyError("get-student-data / getStudentData", {
      message: error instanceof Error ? error.message : String(error),
    })
    return {
      success: false,
      message: "Ocorreu um erro inesperado ao carregar seus dados acadêmicos.",
    }
  }
}
