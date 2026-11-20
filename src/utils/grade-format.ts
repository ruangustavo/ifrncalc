const GRADE_FORMAT = new Intl.NumberFormat("pt-BR", {
  maximumFractionDigits: 2,
})

export function formatGrade(grade: number): string {
  return GRADE_FORMAT.format(grade)
}
