"use client"

import { useSession } from "next-auth/react"
import Link from "next/link"
import { useMemo, useState } from "react"

import { SignInButton } from "@/app/(app)/_components/sign-in-button"
import { Header } from "@/app/dashboard/_components/header"
import { FeedbackLink } from "@/components/feedback-link"

import { computeResult } from "./_components/calc-result"
import { DEFAULT_GRADES, type DisciplineType } from "./_components/discipline"
import { GradeGrid } from "./_components/grade-grid"
import { ResultTop } from "./_components/result-top"

export default function Calculadora() {
  const { data: session, status } = useSession()
  const [disciplineType, setDisciplineType] = useState<DisciplineType>("annual")
  const [grades, setGrades] = useState(DEFAULT_GRADES.annual)

  const result = useMemo(() => computeResult(grades), [grades])

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

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Calculadora de Média IFRN",
    description:
      "Ferramenta para calcular média ponderada no Instituto Federal do Rio Grande do Norte (IFRN)",
    url: "https://ifrncalc.com/calculadora",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "BRL",
    },
    creator: {
      "@type": "Person",
      name: "Ruan Gustavo",
      url: "https://www.linkedin.com/in/ruan-gustavo",
    },
    audience: {
      "@type": "EducationalAudience",
      educationalRole: "student",
    },
    about: {
      "@type": "EducationalOrganization",
      name: "Instituto Federal do Rio Grande do Norte",
      alternateName: "IFRN",
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Header
        viewer={status === "loading" ? "pending" : session ? "member" : "guest"}
      />
      <main className="mx-auto w-full max-w-xl flex-1 px-4 pt-6 pb-28 sm:pt-10">
        <ResultTop result={result} />
        <GradeGrid
          disciplineType={disciplineType}
          onTypeChange={changeType}
          grades={grades}
          onGradeChange={changeGrade}
          onWeightChange={changeWeight}
          onClear={clearGrades}
          result={result}
        />

        <p className="mt-4 text-center text-sm text-muted-foreground">
          Não fechou 60?{" "}
          <Link
            href="/prova-final"
            className="font-medium text-primary underline underline-offset-4"
          >
            Veja quanto precisa na prova final
          </Link>
        </p>

        {status === "unauthenticated" && (
          <div className="mt-3 rounded-3xl bg-chrome p-6 text-chrome-foreground sm:p-8">
            <p className="text-2xl leading-tight font-bold">
              Cansou de digitar nota?
            </p>
            <p className="mt-2 text-pretty text-chrome-foreground/75">
              Conecte com o SUAP e veja essa conta pronta em todas as suas
              disciplinas.
            </p>
            <SignInButton variant="chrome" className="mt-5 w-full sm:w-auto" />
          </div>
        )}

        {session && (
          <p className="mt-6 flex items-center justify-center gap-1 text-sm text-muted-foreground">
            Ideia, problema ou elogio?
            <FeedbackLink user={session.user} />
          </p>
        )}
      </main>
    </>
  )
}
