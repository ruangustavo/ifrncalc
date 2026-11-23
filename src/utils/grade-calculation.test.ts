import assert from "node:assert/strict"
import { test } from "node:test"

import type { Discipline } from "@/actions/get-grades"

import { recalculateGrades } from "./grade-calculation.ts"

const notAssessed = { grade: null, isAvailable: false, passingGrade: -1 }

const secondSemester: Discipline = {
  id: "1",
  name: "Disciplina",
  hours: 60,
  partialAverage: null,
  finalExamGrade: null,
  attendance: null,
  E1: notAssessed,
  E2: notAssessed,
  E3: { grade: 50, isAvailable: false, passingGrade: 0 },
  E4: { grade: null, isAvailable: true, passingGrade: 67 },
}

test("a second-semester discipline recalculates its 3rd and 4th bimester", () => {
  assert.deepEqual(
    recalculateGrades(secondSemester).map((stage) => stage.passingGrade),
    [-1, -1, 0, 67],
  )
})

test("a simulated 3rd bimester moves what the 4th needs", () => {
  assert.deepEqual(
    recalculateGrades(secondSemester, { E3: 80 }).map(
      (stage) => stage.passingGrade,
    ),
    [-1, -1, 0, 47],
  )
})
