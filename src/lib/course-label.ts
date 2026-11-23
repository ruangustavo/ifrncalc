const SUAP_COURSE =
  /^\d+\s*-\s*(.+?)(?:\s*[([]\d{4}[)\]])?(?:\s*-\s*Campus\b.*?)?\s*\(([^()]+)\)$/

const TECHNICAL_COURSE =
  /^Técnico de N[ií]vel Médio em (.+), na forma (Integrad[ao]|Subsequente)$/i

const LOWERCASE_PARTICLES = new Set(["de", "do", "dos", "da", "das", "e"])

function shortenCourseName(name: string) {
  const match = TECHNICAL_COURSE.exec(name)

  if (!match) {
    return name
  }

  const [, area, form] = match
  const shortForm = /^integrad/i.test(form) ? "Integrado" : "Subsequente"

  return `Técnico ${shortForm} em ${area}`
}

function titleCase(text: string) {
  return text
    .toLowerCase()
    .split(/(\s+|-)/)
    .map((word, index) =>
      index > 0 && LOWERCASE_PARTICLES.has(word)
        ? word
        : word.charAt(0).toUpperCase() + word.slice(1),
    )
    .join("")
}

function campusCity(campus: string) {
  return titleCase(campus.replace(/^CAMPUS\s+(AVANÇADO\s+)?/i, ""))
}

export function courseLabel(course: string) {
  const match = SUAP_COURSE.exec(course.trim())

  if (!match) {
    return course
  }

  const [, name, campus] = match

  return `${shortenCourseName(name)} · ${campusCity(campus)}`
}
