import { appendFileSync } from "node:fs"
import { escapeHtml, sendTelegramMessage } from "./telegram.mts"

const SPEC_URL =
  process.env.SUAP_OPENAPI_URL ?? "https://suap.ifrn.edu.br/api/openapi.json"

const REQUIRED_OP_IDS = [
  "api_endpoints_ensino_meus_periodos_letivos",
  "api_endpoints_ensino_meu_boletim",
  "api_endpoints_ensino_get_meus_dados_aluno",
]

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object"
}

function collectOperationIds(spec: unknown): Set<string> {
  const ids = new Set<string>()
  if (!isRecord(spec)) return ids
  const paths = spec.paths
  if (!isRecord(paths)) return ids
  for (const pathItem of Object.values(paths)) {
    if (!isRecord(pathItem)) continue
    for (const operation of Object.values(pathItem)) {
      if (isRecord(operation) && typeof operation.operationId === "string") {
        ids.add(operation.operationId)
      }
    }
  }
  return ids
}

function writeResult(result: "ok" | "missing"): void {
  console.log(`result=${result}`)
  const outputPath = process.env.GITHUB_OUTPUT
  if (outputPath) appendFileSync(outputPath, `result=${result}\n`)
}

async function main(): Promise<number> {
  let spec: unknown
  try {
    const response = await fetch(SPEC_URL, {
      signal: AbortSignal.timeout(20_000),
    })
    if (!response.ok) {
      console.error(`Failed to fetch SUAP spec: HTTP ${response.status}`)
      return 1
    }
    spec = await response.json()
  } catch (error) {
    console.error("Error fetching/parsing SUAP spec:", error)
    return 1
  }

  const present = collectOperationIds(spec)
  const missing = REQUIRED_OP_IDS.filter((id) => !present.has(id))

  if (missing.length > 0) {
    const lines = missing
      .map((id) => `• <code>${escapeHtml(id)}</code>`)
      .join("\n")
    const sent = await sendTelegramMessage(
      "🚨 <b>SUAP: operação monitorada removida</b>\n\n" +
        "Estes <code>operationId</code> sumiram do spec do SUAP:\n" +
        `${lines}\n\n` +
        "O cliente gerado e as Server Actions que dependem deles vão quebrar — " +
        "ação manual necessária.",
    )
    if (!sent) {
      console.error("Operation missing AND Telegram alert failed to send")
      return 1
    }
    writeResult("missing")
    return 0
  }

  writeResult("ok")
  return 0
}

process.exit(await main())
