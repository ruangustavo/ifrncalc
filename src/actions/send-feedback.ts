"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { notifyError } from "@/lib/notify"
import { escapeHtml, sendTelegramMessage } from "@/lib/telegram"

interface UserInfo {
  name?: string | null
  email?: string | null
}

export async function sendFeedback(
  feedback: string,
  user: UserInfo,
): Promise<{ ok: boolean }> {
  const session = await getServerSession(authOptions)
  const accessToken = session?.accessToken

  if (!feedback.trim()) {
    return { ok: false }
  }

  let courseInfo = "Não disponível"

  if (accessToken) {
    try {
      const response = await fetch(
        `${process.env.SUAP_URL}/api/edu/meus-dados-aluno/`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        },
      )

      if (response.ok) {
        const studentData = await response.json()
        courseInfo = studentData.curso || "Não disponível"
      } else if (response.status !== 401) {
        notifyError("send-feedback / meus-dados-aluno", {
          code: `HTTP ${response.status}`,
          message: response.statusText,
        })
      }
    } catch (error) {
      courseInfo = "Erro ao buscar dados"
      notifyError("send-feedback / meus-dados-aluno", {
        message: error instanceof Error ? error.message : String(error),
      })
    }
  }

  const message = `💬 <b>Novo Feedback</b>

${escapeHtml(feedback)}

👤 <b>Usuário:</b> ${escapeHtml(user.name ?? "Desconhecido")} (${escapeHtml(user.email ?? "sem email")})
🎓 <b>Curso:</b> ${escapeHtml(courseInfo)}
🕐 ${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}`

  const ok = await sendTelegramMessage(message)
  return { ok }
}
