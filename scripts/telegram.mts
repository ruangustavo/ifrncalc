export function escapeHtml(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

export async function sendTelegramMessage(text: string): Promise<boolean> {
  const botToken = process.env.TELEGRAM_API_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!botToken || !chatId) {
    console.error("Missing TELEGRAM_API_TOKEN / TELEGRAM_CHAT_ID")
    return false
  }

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
        signal: AbortSignal.timeout(20_000),
      },
    )

    if (!response.ok) {
      console.error("Telegram sendMessage failed:", await response.text())
      return false
    }

    return true
  } catch (error) {
    console.error("Telegram sendMessage error:", error)
    return false
  }
}
