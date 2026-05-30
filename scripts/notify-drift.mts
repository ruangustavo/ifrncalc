import { escapeHtml, sendTelegramMessage } from "./telegram.mts"

const MONITORED_OPS = ["meusPeriodosLetivos", "meuBoletim", "meusDadosAluno"]

const prUrl = process.env.PR_URL
const prNumber = process.env.PR_NUMBER

const prLine =
  prUrl && prUrl.length > 0
    ? `<a href="${escapeHtml(prUrl)}">PR #${escapeHtml(prNumber ?? "?")}</a>`
    : "(link do PR indisponível — confira os PRs abertos)"

const opsList = MONITORED_OPS.map((op) => `• <code>${op}</code>`).join("\n")

const message =
  "📡 <b>SUAP API drift detectado</b>\n\n" +
  "O spec do SUAP mudou numa operação monitorada — o cliente gerado foi " +
  "regenerado e está num PR para revisão:\n\n" +
  `${prLine}\n\n` +
  `<b>Operações monitoradas:</b>\n${opsList}`

const sent = await sendTelegramMessage(message)
process.exit(sent ? 0 : 1)
