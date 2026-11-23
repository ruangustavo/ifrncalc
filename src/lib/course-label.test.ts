import assert from "node:assert/strict"
import { test } from "node:test"

import { courseLabel } from "./course-label.ts"

test("shortens an integrated course and title-cases the campus", () => {
  assert.equal(
    courseLabel(
      "09401 - Técnico de Nível Médio em Informática, na Forma Integrada (CAMPUS PAU DOS FERROS)",
    ),
    "Técnico Integrado em Informática · Pau dos Ferros",
  )
})

test("drops the curriculum year and the repeated campus", () => {
  assert.equal(
    courseLabel(
      "09404 - Tecnologia em Análise e Desenvolvimento de Sistemas (2012) - Campus Pau dos Ferros (CAMPUS PAU DOS FERROS)",
    ),
    "Tecnologia em Análise e Desenvolvimento de Sistemas · Pau dos Ferros",
  )
})

test("drops a bracketed year and the advanced campus prefix", () => {
  assert.equal(
    courseLabel(
      "22111 - Técnico de Nível Médio em Informática para Internet, na Forma Integrado [2024] - Campus Jucurutu (CAMPUS AVANÇADO JUCURUTU)",
    ),
    "Técnico Integrado em Informática para Internet · Jucurutu",
  )
})

test("keeps a bracketed specialization", () => {
  assert.equal(
    courseLabel(
      "19711 - Licenciatura em Educação do Campo [Matemática] - Campus Canguaretama (CAMPUS CANGUARETAMA)",
    ),
    "Licenciatura em Educação do Campo [Matemática] · Canguaretama",
  )
})

test("shortens a subsequent course", () => {
  assert.equal(
    courseLabel(
      "01045 - Técnico de Nível Médio em Eletrotécnica, na Forma Subsequente [2012] - Campus Natal-Central (CAMPUS NATAL - CENTRAL)",
    ),
    "Técnico Subsequente em Eletrotécnica · Natal - Central",
  )
})

test("tolerates SUAP typos in technical course names", () => {
  assert.equal(
    courseLabel(
      "08026 - Técnico de Nivel Médio em Agropecuária, na Forma Integrada (2015) - Campus Apodi (CAMPUS APODI)",
    ),
    "Técnico Integrado em Agropecuária · Apodi",
  )
  assert.equal(
    courseLabel(
      "12064 - Técnico de Nível Médio em Design Gráfico, na forma Integrada (CAMPUS NATAL - CENTRO HISTÓRICO)",
    ),
    "Técnico Integrado em Design Gráfico · Natal - Centro Histórico",
  )
})

test("title-cases hyphenated campus names", () => {
  assert.equal(
    courseLabel(
      "17401 - Técnico de Nível Médio em Informática, na Forma Integrada (CAMPUS CEARÁ-MIRIM)",
    ),
    "Técnico Integrado em Informática · Ceará-Mirim",
  )
})

test("leaves a course in an unknown format as SUAP sent it", () => {
  assert.equal(courseLabel("Informática"), "Informática")
})
