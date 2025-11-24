"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

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

  const botToken = process.env.TELEGRAM_API_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!botToken || !chatId) {
    console.error("TELEGRAM_API_TOKEN or TELEGRAM_CHAT_ID not configured")
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
      }
    } catch (_error) {
      courseInfo = "Erro ao buscar dados"
    }
  }

  const escapeHtml = (text: string) =>
    text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")

  const message = `💬 <b>Novo Feedback</b>

${escapeHtml(feedback)}

👤 <b>Usuário:</b> ${escapeHtml(user.name ?? "Desconhecido")} (${escapeHtml(user.email ?? "sem email")})
🎓 <b>Curso:</b> ${escapeHtml(courseInfo)}
🕐 ${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}`

  try {
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML",
      }),
    })

    if (!response.ok) {
      console.error("Error sending to Telegram:", await response.text())
      return { ok: false }
    }

    return { ok: true }
  } catch (error) {
    console.error("Error sending feedback:", error)
    return { ok: false }
  }
}
