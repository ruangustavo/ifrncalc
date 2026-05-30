"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { notifyError } from "@/lib/notify"
import { meusDadosAluno } from "@/lib/suap/generated/client"

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
    const response = await meusDadosAluno({
      next: { revalidate: 60 * 60 * 6 }, // 6 hours
    })

    if (response.status !== 200) {
      console.error(`Failed to fetch student data: ${response.status}`)
      if (response.status !== 401) {
        notifyError("get-student-data / meusDadosAluno", {
          code: `HTTP ${response.status}`,
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

    return {
      success: true,
      ira: response.data.ira,
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
