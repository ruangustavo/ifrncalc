const COMPUTING_TERMS = [
  "informatica",
  "analise e desenvolvimento de sistemas",
  "sistemas para internet",
  "redes de computadores",
  "jogos digitais",
  "aprendizagem de maquina",
]

function normalize(text: string) {
  return text
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
}

export function isComputingCourse(course: string) {
  const name = normalize(course)

  return COMPUTING_TERMS.some((term) => name.includes(term))
}
