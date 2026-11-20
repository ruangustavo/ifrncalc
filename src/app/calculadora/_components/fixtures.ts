import type { GradeInput } from "./calc-result"
import type { DisciplineType } from "./discipline"

export interface CalcFixture {
  key: string
  label: string
  disciplineType: DisciplineType
  grades: GradeInput[]
}

export const FIXTURES: CalcFixture[] = [
  {
    key: "demo",
    label: "Demo",
    disciplineType: "annual",
    grades: [
      { value: "72", weight: 2 },
      { value: "65", weight: 2 },
      { value: "50", weight: 3 },
      { value: "", weight: 3 },
    ],
  },
  {
    key: "worst",
    label: "Pior caso",
    disciplineType: "annual",
    grades: [
      { value: "100", weight: 1 },
      { value: "59.95", weight: 4 },
      { value: "7.5", weight: 1 },
      { value: "", weight: 4 },
    ],
  },
  {
    key: "light",
    label: "Falta peso 1",
    disciplineType: "annual",
    grades: [
      { value: "55", weight: 4 },
      { value: "55.5", weight: 4 },
      { value: "54.75", weight: 4 },
      { value: "", weight: 1 },
    ],
  },
  {
    key: "rounding",
    label: "Arredondamento",
    disciplineType: "annual",
    grades: [
      { value: "59.9", weight: 2 },
      { value: "60", weight: 2 },
      { value: "60", weight: 3 },
      { value: "59.9", weight: 3 },
    ],
  },
  {
    key: "range",
    label: "Fora da faixa",
    disciplineType: "annual",
    grades: [
      { value: "150", weight: 4 },
      { value: "-20", weight: 1 },
      { value: "1e3", weight: 4 },
      { value: "100.0001", weight: 1 },
    ],
  },
  {
    key: "semester",
    label: "Semestral 4 e 1",
    disciplineType: "semester",
    grades: [
      { value: "33.33", weight: 1 },
      { value: "", weight: 4 },
    ],
  },
  {
    key: "one",
    label: "Uma nota",
    disciplineType: "annual",
    grades: [
      { value: "", weight: 4 },
      { value: "", weight: 4 },
      { value: "99.99", weight: 1 },
      { value: "", weight: 4 },
    ],
  },
  {
    key: "empty",
    label: "Vazio",
    disciplineType: "annual",
    grades: [
      { value: "", weight: 2 },
      { value: "", weight: 2 },
      { value: "", weight: 3 },
      { value: "", weight: 3 },
    ],
  },
]
