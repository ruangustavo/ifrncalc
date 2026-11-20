"use client"

import {
  ArrowRight02Icon,
  HelpCircleIcon,
  PencilEdit02Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import Link from "next/link"
import { useEffect, useRef, ViewTransition } from "react"

import { DisciplineMeta } from "@/app/dashboard/_components/discipline-meta"
import { toDisciplines } from "@/lib/suap/boletim"
import {
  DEMO_BOLETIM,
  DEMO_STUDENT,
  DEMO_STUDENT_DATA,
} from "@/lib/suap/demo-student"
import { cn } from "@/lib/utils"
import { neededAt, recalculateGrades } from "@/utils/grade-calculation"
import { gradeTier, TIER_BORDER, TIER_SURFACE } from "@/utils/grade-tier"

import { BrandMark } from "../brand-mark"
import { type Frame, useDemoStory } from "./use-demo-story"

const SCREEN = { width: 390, height: 800, scale: 304 / 390 }
const DISCIPLINES = toDisciplines(DEMO_BOLETIM).slice(0, 4)
const [MATH] = DISCIPLINES
const TODAY = neededAt(MATH, {}, "E3")
const TARGET = 70
const TICK = 10
const RULER = 358
const FIRST_NAME = DEMO_STUDENT.name.split(" ")[0]

function fourthAfter(third: number) {
  return recalculateGrades(MATH, { E3: third })[3].passingGrade
}

function tierTile(needed: number) {
  const tier = gradeTier(needed)

  return cn("ring-1", TIER_SURFACE[tier], TIER_BORDER[tier])
}

function tileBody(label: string, value: number, editable: boolean) {
  return (
    <>
      <span className="text-xs leading-none font-medium opacity-70">
        {label}
      </span>
      <span className="flex items-center gap-1 text-lg leading-none font-extrabold">
        {value}
        {editable && (
          <HugeiconsIcon
            strokeWidth={2.5}
            icon={PencilEdit02Icon}
            className="size-3.5 opacity-60"
          />
        )}
      </span>
    </>
  )
}

const tile =
  "flex h-14 flex-col items-center justify-center gap-1 rounded-2xl tabular-nums transition-[background-color,box-shadow,transform] duration-200 ease-out"

export function DemoPhone({ onFrame }: { onFrame: (frame: Frame) => void }) {
  const screen = useRef<HTMLDivElement>(null)
  const frame = useDemoStory(screen, TODAY, TARGET)
  const { phase, value } = frame

  const sheetOpen = phase === "sheet" || phase === "saving"
  const saved = phase === "saved"
  const fourth = fourthAfter(value)

  useEffect(() => {
    onFrame(frame)
  }, [onFrame, frame])

  return (
    <figure className="flex flex-col items-center">
      <Link
        href="/demo"
        aria-label={`Abrir o boletim de exemplo da ${FIRST_NAME}`}
        className="block rounded-[2.75rem] bg-ink p-2.5 shadow-[0_40px_80px_-24px_rgb(0_0_0/0.7)] ring-1 ring-cream/15 transition-transform duration-150 ease-snap outline-none focus-visible:ring-4 focus-visible:ring-lime/60 motion-safe:active:scale-[0.99]"
      >
        <ViewTransition name="demo-boletim" share="morph" default="none">
          <div
            ref={screen}
            aria-hidden
            className="relative overflow-hidden rounded-[2.25rem]"
            style={{
              width: SCREEN.width * SCREEN.scale,
              height: SCREEN.height * SCREEN.scale,
            }}
          >
            <div
              className="app-preview absolute top-0 left-0 origin-top-left bg-background font-sans text-foreground"
              style={{
                width: SCREEN.width,
                height: SCREEN.height,
                transform: `scale(${SCREEN.scale})`,
              }}
            >
              <div className="flex h-14 items-center justify-between bg-chrome px-4 text-chrome-foreground">
                <span className="flex items-center gap-2 text-lg font-bold tracking-tight">
                  <BrandMark
                    className="size-5"
                    dotClassName="fill-grade-hard"
                  />
                  IFRN Calc
                </span>
                <span className="flex h-8 items-center gap-1 rounded-[10px] bg-chrome-foreground px-2.5 text-sm font-medium text-chrome">
                  Entrar
                  <HugeiconsIcon
                    strokeWidth={2}
                    icon={ArrowRight02Icon}
                    className="size-4"
                  />
                </span>
              </div>

              <div className="space-y-6 px-4 pt-6">
                <p className="rounded-2xl bg-muted px-4 py-3 text-sm text-pretty text-muted-foreground">
                  <span className="font-semibold text-foreground">
                    Boletim de exemplo.
                  </span>{" "}
                  As notas da {FIRST_NAME} são de mentira. Toca numa nota com
                  lápis pra simular quanto tirar.
                </p>
                <div>
                  <p className="text-2xl font-extrabold tracking-tight">
                    Boletim 2026
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {DEMO_STUDENT_DATA.curso} ·{" "}
                    {DEMO_STUDENT_DATA.periodo_referencia}º ano
                  </p>
                  <p className="mt-4 flex items-center gap-1 text-sm text-muted-foreground">
                    IRA
                    <span className="font-semibold text-foreground">
                      {DEMO_STUDENT_DATA.ira}
                    </span>
                    <HugeiconsIcon
                      strokeWidth={2}
                      icon={HelpCircleIcon}
                      className="size-3.5 opacity-70"
                    />
                  </p>
                </div>

                <ul className="divide-y overflow-hidden rounded-3xl bg-card ring-1 ring-foreground/10">
                  {DISCIPLINES.map((discipline, index) => {
                    const needed = discipline.E3.passingGrade
                    const isMath = index === 0
                    const third = isMath && saved ? TARGET : null

                    const fourthNeeded =
                      isMath && saved ? fourth : discipline.E4.passingGrade

                    return (
                      <li key={discipline.name} className="px-4 pt-3.5 pb-4">
                        <p className="font-bold">{discipline.name}</p>
                        <DisciplineMeta discipline={discipline} />
                        <div className="mt-3 grid grid-cols-4 gap-2">
                          <div className={tile}>
                            <span className="text-xs leading-none font-medium opacity-70">
                              1º Bim
                            </span>
                            <span className="text-lg leading-none font-bold">
                              {discipline.E1.grade}
                            </span>
                          </div>
                          <div className={tile}>
                            <span className="text-xs leading-none font-medium opacity-70">
                              2º Bim
                            </span>
                            <span className="text-lg leading-none font-bold">
                              {discipline.E2.grade}
                            </span>
                          </div>
                          <div
                            data-anchor={isMath ? "third" : undefined}
                            className={cn(
                              "relative",
                              tile,
                              third === null
                                ? tierTile(needed)
                                : "border-2 border-dashed border-foreground/30 bg-card",
                              isMath && phase === "pressing" && "scale-[0.96]",
                            )}
                          >
                            {tileBody("3º Bim", third ?? needed, true)}
                            {isMath && (
                              <span
                                className={cn(
                                  "absolute inset-0 m-auto size-10 rounded-full bg-foreground/20 transition-[opacity,transform] duration-300 ease-out",
                                  phase === "pressing"
                                    ? "scale-100 opacity-100"
                                    : "scale-150 opacity-0",
                                )}
                              />
                            )}
                          </div>
                          <div
                            data-anchor={isMath ? "fourth" : undefined}
                            className={cn(tile, tierTile(fourthNeeded))}
                          >
                            {tileBody("4º Bim", fourthNeeded, true)}
                          </div>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </div>

              <div
                className={cn(
                  "absolute inset-0 bg-foreground/15 backdrop-blur-[3px] transition-opacity duration-300 ease-out",
                  sheetOpen ? "opacity-100" : "opacity-0",
                )}
              />

              <div
                className={cn(
                  "absolute inset-x-0 bottom-0 rounded-t-[20px] bg-card px-4 pt-4 pb-5 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
                  sheetOpen ? "translate-y-0" : "translate-y-full",
                )}
              >
                <div className="mx-auto h-1.5 w-[100px] rounded-full bg-muted" />
                <div className="mt-4 text-center">
                  <p className="font-semibold">Simular nota</p>
                  <p className="text-sm text-muted-foreground">
                    {MATH.name} · 3° Bimestre
                  </p>
                </div>

                <p className="mt-6 text-center text-sm text-muted-foreground">
                  Se tirar no 3º
                </p>
                <p
                  data-anchor="value"
                  className="mt-1 text-center text-7xl leading-none font-extrabold tracking-tighter tabular-nums"
                >
                  {value}
                </p>

                <div className="relative mt-5 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_25%,black_75%,transparent)]">
                  <div
                    className="flex"
                    style={{
                      transform: `translateX(${RULER / 2 - TICK / 2 - value * TICK}px)`,
                    }}
                  >
                    {Array.from({ length: 101 }, (_, mark) => (
                      <div
                        key={mark}
                        className="relative flex h-16 w-2.5 shrink-0 justify-center"
                      >
                        <span
                          className={cn(
                            "mt-1 w-px",
                            mark % 10 === 0
                              ? "h-7 bg-foreground/50"
                              : mark % 5 === 0
                                ? "h-5 bg-foreground/30"
                                : "h-3 bg-foreground/20",
                          )}
                        />
                        {mark % 10 === 0 && (
                          <span className="absolute top-9 text-xs text-muted-foreground tabular-nums">
                            {mark}
                          </span>
                        )}
                        {mark === TODAY && (
                          <span className="absolute bottom-1 size-1 rounded-full bg-foreground/60" />
                        )}
                      </div>
                    ))}
                  </div>
                  <span className="absolute top-0 left-1/2 h-9 w-0.5 -translate-x-1/2 rounded-full bg-foreground" />
                </div>

                <div className="mt-1 flex justify-center">
                  <span
                    className={cn(
                      "flex h-8 items-center rounded-[10px] bg-secondary px-2.5 text-sm font-medium text-secondary-foreground",
                      value === TODAY && "invisible",
                    )}
                  >
                    Voltar pro {TODAY}, o que falta hoje
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-4 gap-2">
                  {[
                    {
                      label: "1º Bim",
                      text: String(MATH.E1.grade),
                      kind: "done",
                    },
                    {
                      label: "2º Bim",
                      text: String(MATH.E2.grade),
                      kind: "done",
                    },
                    { label: "3º Bim", text: String(value), kind: "chosen" },
                    { label: "4º Bim", text: String(fourth), kind: "open" },
                  ].map((cell) => (
                    <div
                      key={cell.label}
                      className={cn(
                        "flex h-14 flex-col items-center justify-center gap-1 rounded-2xl text-lg leading-none tabular-nums",
                        cell.kind === "done" &&
                          "font-semibold text-muted-foreground",
                        cell.kind === "chosen" &&
                          "border-2 border-dashed border-foreground/30 font-extrabold",
                        cell.kind === "open" &&
                          "bg-card font-extrabold ring-1 ring-foreground/15",
                      )}
                    >
                      <span className="text-xs leading-none font-medium opacity-70">
                        {cell.label}
                      </span>
                      {cell.text}
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-col gap-2">
                  <span className="flex h-9 items-center justify-center rounded-lg border border-border bg-background text-sm font-medium">
                    Cancelar
                  </span>
                  <span
                    className={cn(
                      "flex h-9 items-center justify-center rounded-lg bg-primary text-sm font-medium text-primary-foreground transition-transform duration-150 ease-out",
                      phase === "saving" && "scale-[0.97]",
                    )}
                  >
                    Salvar
                  </span>
                </div>
              </div>
            </div>
          </div>
        </ViewTransition>
      </Link>
      <figcaption className="mt-5 flex items-center gap-1.5 text-sm text-cream/70">
        Abrir o boletim da {FIRST_NAME} e simular você mesmo
        <HugeiconsIcon
          strokeWidth={2}
          icon={ArrowRight02Icon}
          className="size-4"
        />
      </figcaption>
    </figure>
  )
}
