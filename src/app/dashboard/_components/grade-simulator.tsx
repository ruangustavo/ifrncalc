"use client"

import { useState } from "react"

import type { Discipline } from "@/actions/get-grades"
import { Button } from "@/components/ui/button"
import { CredenzaFooter } from "@/components/ui/credenza"
import { cn } from "@/lib/utils"
import {
  neededAt,
  type SimulationOutcome,
  simulateGrade,
  type StageKey,
} from "@/utils/grade-calculation"

import { GradeRuler } from "./grade-ruler"
import { SimulationTiles } from "./simulation-tiles"
import { STAGES } from "./stages"

interface GradeSimulatorProps {
  discipline: Discipline
  editedGrades: Record<string, number>
  stage: StageKey
  onSubmit: (grade: number) => void
  onClose: () => void
}

function stageName(stage: StageKey) {
  return STAGES.find(({ key }) => key === stage)?.shortLabel.replace(" Bim", "")
}

function describe(outcome: SimulationOutcome) {
  const stages =
    outcome.kind === "final" ? "" : outcome.stages.map(stageName).join(" e ")

  if (outcome.kind === "secured") return "Aprovação garantida"

  if (outcome.kind === "impossible")
    return `Não dá pra atingir os 60: precisaria de ${outcome.needed} no ${stages}`

  if (outcome.kind === "final")
    return `Média final ${Math.floor(outcome.average)}`

  return `Precisa de ${outcome.needed} no ${stages}`
}

export function GradeSimulator({
  discipline,
  editedGrades,
  stage,
  onSubmit,
  onClose,
}: GradeSimulatorProps) {
  const today = neededAt(discipline, editedGrades, stage)

  const [grade, setGrade] = useState(
    () => editedGrades[stage] ?? Math.min(100, today),
  )

  const outcome = simulateGrade(discipline, editedGrades, stage, grade)
  const canReset = today <= 100 && grade !== today

  return (
    <div className="p-4 md:p-0">
      <p className="text-center text-sm text-muted-foreground">
        Se tirar no {stageName(stage)}
      </p>
      <p className="mt-1 text-center text-7xl leading-none font-extrabold tracking-tighter tabular-nums">
        {grade}
      </p>
      <div className="mt-5">
        <GradeRuler
          value={grade}
          onChange={setGrade}
          marker={today <= 100 ? today : null}
          label={`Nota simulada no ${stageName(stage)} bimestre`}
          valueText={`${grade}. ${describe(outcome)}`}
        />
      </div>
      <div className="mt-1 flex justify-center">
        <Button
          type="button"
          variant="secondary"
          size="sm"
          tabIndex={canReset ? 0 : -1}
          aria-hidden={!canReset}
          onClick={() => setGrade(today)}
          className={cn(!canReset && "invisible")}
        >
          Voltar pro {today}, o que falta hoje
        </Button>
      </div>
      <div aria-live="polite" className="mt-5 mb-6 md:mb-2">
        <SimulationTiles
          discipline={discipline}
          editedGrades={editedGrades}
          stage={stage}
          grade={grade}
          outcome={outcome}
        />
      </div>
      <CredenzaFooter>
        <Button type="button" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button
          type="button"
          onClick={() => {
            onSubmit(grade)
            onClose()
          }}
        >
          Salvar
        </Button>
      </CredenzaFooter>
    </div>
  )
}
