import { gradeTier, TIER_SURFACE } from "@/utils/grade-tier"

import type { CalcResult } from "./calc-result"

const ORDINALS = ["primeira", "segunda", "terceira", "quarta"]
const NEUTRAL = "bg-muted text-foreground"

const FLOAT_NOISE = 1e-9

function format(value: number) {
  return value.toLocaleString("pt-BR", { maximumFractionDigits: 1 })
}

function formatAverage(value: number) {
  return format(Math.floor(value * 10 + FLOAT_NOISE) / 10)
}

function formatNeeded(value: number) {
  return format(Math.ceil(value * 10 - FLOAT_NOISE) / 10)
}

function neededHint(needed: number) {
  if (needed <= 40) return "fácil de alcançar"

  if (needed <= 90) return "alcançável"

  return "difícil de alcançar"
}

export function describeResult(result: CalcResult) {
  if (result.kind === "needed")
    return {
      surface: TIER_SURFACE[gradeTier(result.needed)],
      label: "Precisa de",
      number: formatNeeded(result.needed),
      title: `na ${ORDINALS[result.missingIndex]} avaliação`,
      detail: `${neededHint(result.needed)} · média parcial ${formatAverage(result.average)}`,
    }

  if (result.kind === "secured")
    return {
      surface: TIER_SURFACE.easy,
      label: "Precisa de",
      number: "0",
      title: "Aprovação garantida",
      detail: "Você passa independentemente da última nota.",
    }

  if (result.kind === "impossible")
    return {
      surface: TIER_SURFACE.hard,
      label: "Precisaria de",
      number: "+100",
      title: "Não dá pra atingir os 60",
      detail: "Seria necessária uma nota acima de 100.",
    }

  if (result.kind === "final")
    return {
      surface: result.passed ? TIER_SURFACE.easy : NEUTRAL,
      label: "Média final",
      number: formatAverage(result.average),
      title: result.passed ? "Aprovado" : "Não atingiu os 60",
      detail: "Todas as notas preenchidas.",
    }

  if (result.kind === "partial")
    return {
      surface: NEUTRAL,
      label: "Média parcial",
      number: formatAverage(result.average),
      title: "Falta fechar a conta",
      detail: "Deixe só uma nota em branco.",
    }

  if (result.kind === "invalid")
    return {
      surface: NEUTRAL,
      label: null,
      number: null,
      title: "As notas vão de 0 a 100",
      detail: "Corrija a nota em vermelho.",
    }

  return {
    surface: NEUTRAL,
    label: null,
    number: null,
    title: "Quanto falta pra passar?",
    detail:
      "Digite as notas que você já tem e deixe em branco a que falta. A média pra passar é 60.",
  }
}
