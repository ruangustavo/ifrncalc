import { escapeHtml, sendTelegramMessage } from "@/lib/telegram"

interface ErrorInfo {
  code?: string
  message?: string
}

export function notifyError(context: string, info: ErrorInfo = {}): void {
  const when = new Date().toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
  })

  const lines = [
    "🚨 <b>ifrncalc</b>",
    `<b>Contexto:</b> ${escapeHtml(context)}`,
    info.code ? `<b>Código:</b> ${escapeHtml(info.code)}` : null,
    info.message
      ? `<b>Mensagem:</b> ${escapeHtml(info.message.slice(0, 500))}`
      : null,
    `🕐 ${when}`,
  ]
    .filter((line): line is string => line !== null)
    .join("\n")

  void sendTelegramMessage(lines).catch(() => {})
}
