"use client"

import { useState } from "react"

import { computeResult } from "@/app/calculadora/_components/calc-result"
import {
  DEFAULT_GRADES,
  type DisciplineType,
} from "@/app/calculadora/_components/discipline"
import { GradeGrid } from "@/app/calculadora/_components/grade-grid"
import { cn } from "@/lib/utils"

import { describeOutlook } from "./describe-outlook"

export function FinalExamCalculator() {
  const [disciplineType, setDisciplineType] = useState<DisciplineType>("annual")
  const [grades, setGrades] = useState(DEFAULT_GRADES.annual)

  const view = describeOutlook(grades)

  const changeType = (type: DisciplineType) => {
    setDisciplineType(type)
    setGrades(DEFAULT_GRADES[type])
  }

  const changeGrade = (index: number, value: string) =>
    setGrades((previous) =>
      previous.map((grade, i) => (i === index ? { ...grade, value } : grade)),
    )

  const changeWeight = (index: number, weight: number) =>
    setGrades((previous) =>
      previous.map((grade, i) => (i === index ? { ...grade, weight } : grade)),
    )

  const clearGrades = () =>
    setGrades((previous) => previous.map((grade) => ({ ...grade, value: "" })))

  return (
    <section aria-labelledby="calculadora-prova-final" className="mt-8">
      <h2 id="calculadora-prova-final" className="sr-only">
        Calculadora da prova final
      </h2>
      <div
        aria-live="polite"
        className={cn(
          "@container rounded-3xl p-5 transition-colors duration-200 ease-out sm:p-6",
          view.surface,
        )}
      >
        {view.number === null ? (
          <div className="flex min-h-26 flex-col justify-center">
            <p className="text-2xl leading-tight font-extrabold tracking-tight text-balance">
              {view.title}
            </p>
            <p className="mt-2 max-w-sm text-sm text-pretty opacity-75">
              {view.detail}
            </p>
          </div>
        ) : (
          <div className="flex min-h-26 flex-col gap-4 @xs:flex-row @xs:items-end @xs:justify-between @xs:gap-6">
            <div>
              <p className="text-xs font-semibold tracking-wide uppercase">
                {view.label}
              </p>
              <p className="mt-2 text-7xl leading-none font-extrabold tracking-tighter tabular-nums">
                {view.number}
              </p>
            </div>
            <div className="@xs:max-w-48 @xs:text-right">
              <p className="text-lg leading-tight font-bold text-balance">
                {view.title}
              </p>
              <p className="mt-1 text-sm text-pretty opacity-75">
                {view.detail}
              </p>
            </div>
          </div>
        )}
      </div>
      <GradeGrid
        disciplineType={disciplineType}
        onTypeChange={changeType}
        grades={grades}
        onGradeChange={changeGrade}
        onWeightChange={changeWeight}
        onClear={clearGrades}
        result={computeResult(grades)}
      />
    </section>
  )
}
