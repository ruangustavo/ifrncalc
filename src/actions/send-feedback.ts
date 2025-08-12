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

  const webhookUrl = process.env.DISCORD_WEBHOOK_URL
  if (!webhookUrl) {
    console.error("DISCORD_WEBHOOK_URL is not configured")
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

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        embeds: [
          {
            title: "Novo feedback",
            description: feedback,
            fields: [
              {
                name: "Usuário",
                value: `${user.name ?? "Desconhecido"} (${user.email ?? "sem email"})`,
              },
              {
                name: "Curso",
                value: courseInfo,
              },
            ],
            color: 0x00ff00,
            timestamp: new Date().toISOString(),
          },
        ],
      }),
    })

    return { ok: true }
  } catch (error) {
    console.error("Error sending feedback:", error)
    return { ok: false }
  }
}
