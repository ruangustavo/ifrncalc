import assert from "node:assert/strict"
import { test } from "node:test"

import { toDisciplines } from "./boletim.ts"
import type { BoletimSchema } from "./generated/models"

const semesterDiscipline = (segundo_semestre: boolean): BoletimSchema => ({
  codigo_diario: "1",
  disciplina: "TEC.0001 - Disciplina",
  segundo_semestre,
  quantidade_avaliacoes: 2,
  nota_etapa_1: { nota: 50, faltas: 0 },
  nota_etapa_2: { nota: null, faltas: 0 },
  nota_etapa_3: { nota: null, faltas: 0 },
  nota_etapa_4: { nota: null, faltas: 0 },
})

test("a second-semester discipline takes the 3rd and 4th bimester", () => {
  const [discipline] = toDisciplines([semesterDiscipline(true)])

  assert.deepEqual(
    [discipline.E1, discipline.E2, discipline.E3, discipline.E4],
    [
      { grade: null, isAvailable: false, passingGrade: -1 },
      { grade: null, isAvailable: false, passingGrade: -1 },
      { grade: 50, isAvailable: false, passingGrade: 0 },
      { grade: null, isAvailable: true, passingGrade: 67 },
    ],
  )
})

test("a first-semester discipline keeps the 1st and 2nd bimester", () => {
  const [discipline] = toDisciplines([semesterDiscipline(false)])

  assert.deepEqual(
    [discipline.E1, discipline.E2, discipline.E3, discipline.E4],
    [
      { grade: 50, isAvailable: false, passingGrade: 0 },
      { grade: null, isAvailable: true, passingGrade: 67 },
      { grade: null, isAvailable: false, passingGrade: -1 },
      { grade: null, isAvailable: false, passingGrade: -1 },
    ],
  )
})
