const IRA_FORMAT = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 2 })

export function parseIra(raw: string): number | null {
  const ira = Number(raw.trim().replace(",", "."))

  return raw.trim() === "" || !Number.isFinite(ira) || ira <= 0 ? null : ira
}

export function formatIra(ira: number): string {
  return IRA_FORMAT.format(ira)
}
