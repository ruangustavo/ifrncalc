"use client"

import { useId, useState } from "react"

import { cn } from "@/lib/utils"

import { describeAttendance } from "./describe-attendance"

export function AttendanceCalculator() {
  const [classes, setClasses] = useState("")
  const [absences, setAbsences] = useState("")
  const classesId = useId()
  const absencesId = useId()

  const view = describeAttendance(classes, absences)

  return (
    <section aria-labelledby="calculadora-frequencia" className="mt-8">
      <h2 id="calculadora-frequencia" className="sr-only">
        Calculadora de frequência
      </h2>
      <div
        aria-live="polite"
        className={cn(
          "@container rounded-3xl p-5 transition-colors duration-200 ease-out sm:p-6",
          view.surface,
        )}
      >
        {view.kind === "message" ? (
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
                Sua frequência
              </p>
              <p className="mt-2 text-7xl leading-none font-extrabold tracking-tighter tabular-nums">
                {view.rate}%
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
      <div className="mt-3 grid grid-cols-2 overflow-hidden rounded-3xl bg-card ring-1 ring-foreground/10">
        {[
          {
            id: classesId,
            label: "Aulas no período",
            placeholder: "800",
            value: classes,
            onChange: setClasses,
          },
          {
            id: absencesId,
            label: "Faltas no período",
            placeholder: "40",
            value: absences,
            onChange: setAbsences,
          },
        ].map((field, index) => (
          <div
            key={field.id}
            className={cn(
              "flex flex-col gap-2 p-4 transition-colors duration-150 ease-out has-[input:focus]:bg-muted/50 sm:p-5",
              index === 0 && "border-r",
            )}
          >
            <label htmlFor={field.id} className="text-sm font-semibold">
              {field.label}
            </label>
            <input
              id={field.id}
              type="text"
              inputMode="numeric"
              autoComplete="off"
              placeholder={field.placeholder}
              value={field.value}
              onChange={(event) => {
                const next = event.target.value

                if (/^\d{0,4}$/.test(next)) field.onChange(next)
              }}
              className="w-full min-w-0 bg-transparent text-4xl leading-none font-extrabold tracking-tight tabular-nums outline-none placeholder:text-muted-foreground/40"
            />
          </div>
        ))}
      </div>
    </section>
  )
}
