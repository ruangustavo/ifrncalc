import { appendFileSync } from "node:fs"
import { escapeHtml, sendTelegramMessage } from "./telegram.mts"

const SPEC_URL =
  process.env.SUAP_OPENAPI_URL ?? "https://suap.ifrn.edu.br/api/openapi.json"

const REQUIRED_OP_IDS = [
  "api_endpoints_ensino_meus_periodos_letivos",
  "api_endpoints_ensino_meu_boletim",
  "api_endpoints_ensino_get_meus_dados_aluno",
]

interface OpenApiSpec {
  paths: object
}

interface Operation {
  operationId: string
}

function isObject(value: unknown): value is object {
  return value !== null && typeof value === "object"
}

function isOpenApiSpec(value: unknown): value is OpenApiSpec {
  return isObject(value) && "paths" in value && isObject(value.paths)
}

function isOperation(value: unknown): value is Operation {
  return (
    isObject(value) &&
    "operationId" in value &&
    typeof value.operationId === "string"
  )
}

function collectOperationIds(spec: OpenApiSpec): Set<string> {
  const ids = new Set<string>()

  for (const pathItem of Object.values(spec.paths)) {
    if (!isObject(pathItem)) continue

    for (const operation of Object.values(pathItem)) {
      if (isOperation(operation)) ids.add(operation.operationId)
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

  const present = isOpenApiSpec(spec) ? collectOperationIds(spec) : new Set<string>()
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
