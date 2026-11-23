import assert from "node:assert/strict"
import { test } from "node:test"

import { isComputingCourse } from "./computing-course.ts"

const COMPUTING_COURSES = [
  "09401 - Técnico de Nível Médio em Informática, na Forma Integrada (CAMPUS PAU DOS FERROS)",
  "10111 - Técnico de Nível Médio em Informática para Internet, na Forma Integrada (CAMPUS CAICÓ)",
  "09404 - Tecnologia em Análise e Desenvolvimento de Sistemas (2012) - Campus Pau dos Ferros (CAMPUS PAU DOS FERROS)",
  "17015 - Técnico de Nível Médio em Programação de Jogos Digitais, na Forma Integrada (CAMPUS CEARÁ-MIRIM)",
  "11112 - Técnico de Nível Médio em Manutenção e Suporte em Informática, na Forma Integrada (CAMPUS SANTA CRUZ)",
  "09124 - Superior de Tecnologia em Aprendizagem de Máquina no formato de oferta EaD (CAMPUS PAU DOS FERROS)",
  "01405 - Tecnologia em Redes de Computadores (2012) - Campus Natal-Central (CAMPUS NATAL - CENTRAL)",
  "Tecnologia em Sistemas para Internet",
  "Licenciatura em Informática",
]

const OTHER_COURSES = [
  "12807 - Técnico de Nível Médio em Multimídia, na Forma Integrada (CAMPUS NATAL - CENTRO HISTÓRICO)",
  "12064 - Técnico de Nível Médio em Design Gráfico, na forma Integrada (CAMPUS NATAL - CENTRO HISTÓRICO)",
  "01201 - Técnico de Nível Médio em Eletrotécnica, na Forma Integrada (CAMPUS NATAL - CENTRAL)",
  "04206 - Técnico de Nível Médio em Eletrônica, na Forma Integrada (CAMPUS NATAL - ZONA NORTE)",
  "16121 - Técnico de Nível Médio em Logística, na Forma Integrada (CAMPUS SÃO GONÇALO DO AMARANTE)",
  "01209 - Engenharia de Energia [2016] - Campus Natal - Central (CAMPUS NATAL - CENTRAL)",
]

for (const course of COMPUTING_COURSES) {
  test(`counts as computing: ${course}`, () => {
    assert.equal(isComputingCourse(course), true)
  })
}

for (const course of OTHER_COURSES) {
  test(`does not count as computing: ${course}`, () => {
    assert.equal(isComputingCourse(course), false)
  })
}

test("ignores accents and case", () => {
  assert.equal(isComputingCourse("TECNICO EM INFORMATICA"), true)
})
