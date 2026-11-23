import type { BoletimSchema } from "@/lib/suap/generated/models"
import { sendTelegramMessage } from "@/lib/telegram"

const STAGE_KEYS = [
  "nota_etapa_1",
  "nota_etapa_2",
  "nota_etapa_3",
  "nota_etapa_4",
] as const

const reported = new Set<string>()

function isSemesterDiscipline(boletim: BoletimSchema): boolean {
  return (
    boletim.segundo_semestre === true || boletim.quantidade_avaliacoes === 2
  )
}

function isUnreported(boletim: BoletimSchema): boolean {
  const diary = boletim.codigo_diario

  if (diary === undefined || reported.has(diary)) return false

  reported.add(diary)

  return true
}

function describeStageLayout(boletim: BoletimSchema): string {
  const present = STAGE_KEYS.flatMap((key, index) =>
    boletim[key] === undefined ? [] : [index + 1],
  )

  const graded = STAGE_KEYS.flatMap((key, index) =>
    boletim[key]?.nota == null ? [] : [index + 1],
  )

  return [
    `segundo_semestre: ${String(boletim.segundo_semestre)}`,
    `quantidade_avaliacoes: ${String(boletim.quantidade_avaliacoes)}`,
    `etapas com nota: [${graded.join(", ")}]`,
    `etapas presentes no JSON: [${present.join(", ")}]`,
  ].join(" · ")
}

export function reportSemesterStageLayouts(results: BoletimSchema[]): void {
  const layouts = results.flatMap((boletim) =>
    isSemesterDiscipline(boletim) && isUnreported(boletim)
      ? [describeStageLayout(boletim)]
      : [],
  )

  if (layouts.length === 0) return

  console.log("[semester-probe]", JSON.stringify(layouts))

  void sendTelegramMessage(
    ["🔎 <b>ifrncalc</b> · semester probe", ...layouts].join("\n"),
  ).catch(() => {})
}
