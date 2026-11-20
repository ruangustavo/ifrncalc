import assert from "node:assert/strict"
import { test } from "node:test"

import { disciplineOutlook, finalExamOutlook } from "./final-exam.ts"

const annual = (grades: number[]) =>
  grades.map((grade, index) => ({ grade, weight: index < 2 ? 2 : 3 }))

const semester = (grades: number[]) =>
  grades.map((grade, index) => ({ grade, weight: index === 0 ? 2 : 3 }))

test("average of 60 or more passes without a final exam", () => {
  assert.deepEqual(finalExamOutlook(annual([60, 60, 60, 60])), {
    kind: "approved",
    average: 60,
  })
})

test("average below 20 fails without the right to a final exam", () => {
  assert.deepEqual(finalExamOutlook(annual([10, 10, 25, 25])), {
    kind: "failed",
    average: 19,
  })
})

test("an average of exactly 20 still takes the final exam", () => {
  assert.deepEqual(finalExamOutlook(annual([20, 20, 20, 20])), {
    kind: "exam",
    average: 20,
    needed: 100,
    replaces: null,
  })
})

test("even grades need 120 minus the average", () => {
  assert.deepEqual(finalExamOutlook(annual([40, 50, 55, 60])), {
    kind: "exam",
    average: 52.5,
    needed: 67.5,
    replaces: null,
  })
})

test("one very low bimester is replaced by the final exam", () => {
  const outlook = finalExamOutlook(annual([70, 70, 10, 70]))

  assert.equal(outlook.kind, "exam")
  assert.equal(outlook.kind === "exam" && outlook.replaces, 2)
  assert.equal(outlook.kind === "exam" && Math.ceil(outlook.needed), 37)
})

test("semester subjects use weights 2 and 3", () => {
  assert.deepEqual(finalExamOutlook(semester([30, 60])), {
    kind: "exam",
    average: 48,
    needed: 60,
    replaces: 0,
  })
})

test("a block subject needs 60 on the final exam", () => {
  assert.deepEqual(finalExamOutlook([{ grade: 45, weight: 1 }]), {
    kind: "exam",
    average: 45,
    needed: 60,
    replaces: 0,
  })
})

const stage = (grade: number | null, exists = true) => ({
  grade,
  isAvailable: exists && grade === null,
  passingGrade: exists ? 0 : -1,
})

const discipline = (
  grades: (number | null)[],
  finalExamGrade: number | null = null,
) => ({
  id: "TEC.1440",
  name: "Matemática III",
  hours: 120,
  partialAverage: null,
  finalExamGrade,
  E1: stage(grades[0] ?? null, grades.length > 0),
  E2: stage(grades[1] ?? null, grades.length > 1),
  E3: stage(grades[2] ?? null, grades.length > 2),
  E4: stage(grades[3] ?? null, grades.length > 3),
})

test("a closed annual discipline gets its final exam outlook", () => {
  const outlook = disciplineOutlook(discipline([70, 70, 10, 70]))

  assert.equal(outlook?.kind, "exam")
  assert.equal(outlook?.kind === "exam" && outlook.replaces, 2)
})

test("a closed semester discipline uses weights 2 and 3", () => {
  assert.deepEqual(disciplineOutlook(discipline([30, 60])), {
    kind: "exam",
    average: 48,
    needed: 60,
    replaces: 0,
  })
})

test("a discipline with a bimester still open has no outlook", () => {
  assert.equal(disciplineOutlook(discipline([70, 70, 10, null])), null)
})

test("a discipline whose final exam was already graded has no outlook", () => {
  assert.equal(disciplineOutlook(discipline([70, 70, 10, 70], 80)), null)
})
