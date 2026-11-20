import assert from "node:assert/strict"
import { test } from "node:test"

import {
  absenceLimit,
  describeAbsences,
  rateFrom,
  toAttendance,
} from "./attendance.ts"

test("reads absences and the attendance rate SUAP reports", () => {
  assert.deepEqual(
    toAttendance({
      carga_horaria_cumprida: 48,
      numero_faltas: 11,
      percentual_carga_horaria_frequentada: 77.08,
    }),
    { absences: 11, rate: 77, classesHeld: 48 },
  )
})

test("has no attendance before any class is held", () => {
  assert.equal(
    toAttendance({
      carga_horaria_cumprida: 0,
      numero_faltas: 0,
      percentual_carga_horaria_frequentada: 100,
    }),
    null,
  )
})

test("has no attendance when SUAP leaves the rate out", () => {
  assert.equal(
    toAttendance({ carga_horaria_cumprida: 48, numero_faltas: 2 }),
    null,
  )
})

test("absences read as a student would say them", () => {
  assert.equal(describeAbsences(0), "nenhuma falta")
  assert.equal(describeAbsences(1), "1 falta")
  assert.equal(describeAbsences(11), "11 faltas")
})

test("the rate is the share of classes attended, rounded down", () => {
  assert.equal(rateFrom({ classes: 800, absences: 41 }), 94)
  assert.equal(rateFrom({ classes: 800, absences: 200 }), 75)
  assert.equal(rateFrom({ classes: 800, absences: 201 }), 74)
})

test("the absence limit is 25% of the period's classes, rounded down", () => {
  assert.equal(absenceLimit(800), 200)
  assert.equal(absenceLimit(1030), 257)
})
