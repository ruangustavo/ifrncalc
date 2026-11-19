type StageKey = "E1" | "E2" | "E3" | "E4"

export const STAGES: {
  key: StageKey
  label: string
  shortLabel: string
}[] = [
  { key: "E1", label: "1° Bimestre", shortLabel: "1º Bim" },
  { key: "E2", label: "2° Bimestre", shortLabel: "2º Bim" },
  { key: "E3", label: "3° Bimestre", shortLabel: "3º Bim" },
  { key: "E4", label: "4° Bimestre", shortLabel: "4º Bim" },
] as const
