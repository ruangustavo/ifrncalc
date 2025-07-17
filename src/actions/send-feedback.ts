"use server"

interface UserInfo {
  name?: string | null
  email?: string | null
}

export async function sendFeedback(
  feedback: string,
  user: UserInfo,
): Promise<{ ok: boolean }> {
  if (!feedback.trim()) {
    return { ok: false }
  }

  const webhookUrl = process.env.DISCORD_WEBHOOK_URL
  if (!webhookUrl) {
    console.error("DISCORD_WEBHOOK_URL is not configured")
    return { ok: false }
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
