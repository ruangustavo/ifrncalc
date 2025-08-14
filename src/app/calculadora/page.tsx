"use client"

import { ArrowLeft, InfoIcon } from "lucide-react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { Header } from "@/app/dashboard/_components/header"
import { FeedbackDialog } from "@/components/feedback-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

type DisciplineType = "annual" | "semester"

interface GradeInput {
  value: string
  weight: number
}

interface CalculationResult {
  currentAverage: number | null
  neededGrade: number | null
  missingGradeIndex: number | null
  canPass: boolean
}

export default function Calculadora() {
  const { data: session } = useSession()
  const [disciplineType, setDisciplineType] = useState<DisciplineType>("annual")
  const [grades, setGrades] = useState<GradeInput[]>([
    { value: "", weight: 2 },
    { value: "", weight: 2 },
    { value: "", weight: 3 },
    { value: "", weight: 3 },
  ])
  const [calculationResult, setCalculationResult] = useState<CalculationResult>(
    {
      currentAverage: null,
      neededGrade: null,
      missingGradeIndex: null,
      canPass: false,
    },
  )
  const [isCalculated, setIsCalculated] = useState(false)

  const updateGrade = (index: number, value: string) => {
    const newGrades = [...grades]
    newGrades[index] = { ...newGrades[index], value }
    setGrades(newGrades)
  }

  const calculateGradeNeeded = (
    grades: GradeInput[],
    targetAverage: number = 60,
  ): CalculationResult => {
    const validGrades = grades.filter((grade) => grade.value !== "")
    const emptyGradeIndex = grades.findIndex((grade) => grade.value === "")

    if (emptyGradeIndex === -1) {
      const totalWeightedSum = validGrades.reduce((sum, grade) => {
        return sum + parseFloat(grade.value) * grade.weight
      }, 0)
      const totalWeight = validGrades.reduce(
        (sum, grade) => sum + grade.weight,
        0,
      )
      const currentAverage = totalWeightedSum / totalWeight

      return {
        currentAverage,
        neededGrade: null,
        missingGradeIndex: null,
        canPass: currentAverage >= targetAverage,
      }
    }

    const totalWeightedSum = validGrades.reduce((sum, grade) => {
      return sum + parseFloat(grade.value) * grade.weight
    }, 0)
    const totalWeight = validGrades.reduce(
      (sum, grade) => sum + grade.weight,
      0,
    )
    const missingGradeWeight = grades[emptyGradeIndex].weight

    const currentAverage = totalWeightedSum / totalWeight
    const neededGrade =
      (targetAverage * (totalWeight + missingGradeWeight) - totalWeightedSum) /
      missingGradeWeight

    return {
      currentAverage,
      neededGrade: neededGrade <= 100 ? neededGrade : null,
      missingGradeIndex: emptyGradeIndex,
      canPass: neededGrade <= 100,
    }
  }

  const calculateAverage = () => {
    const currentGrades =
      disciplineType === "annual" ? grades : grades.slice(0, 2)
    const validGrades = currentGrades.filter((grade) => grade.value !== "")

    if (validGrades.length === 0) return

    const result = calculateGradeNeeded(currentGrades)
    setCalculationResult(result)
    setIsCalculated(true)
  }

  const clearAll = () => {
    if (disciplineType === "annual") {
      setGrades([
        { value: "", weight: 2 },
        { value: "", weight: 2 },
        { value: "", weight: 3 },
        { value: "", weight: 3 },
      ])
    } else {
      setGrades([
        { value: "", weight: 2 },
        { value: "", weight: 3 },
      ])
    }
    setCalculationResult({
      currentAverage: null,
      neededGrade: null,
      missingGradeIndex: null,
      canPass: false,
    })
    setIsCalculated(false)
  }

  const handleDisciplineTypeChange = (value: string) => {
    const type = value as DisciplineType
    setDisciplineType(type)

    if (type === "annual") {
      setGrades([
        { value: "", weight: 2 },
        { value: "", weight: 2 },
        { value: "", weight: 3 },
        { value: "", weight: 3 },
      ])
    } else {
      setGrades([
        { value: "", weight: 2 },
        { value: "", weight: 3 },
      ])
    }

    setCalculationResult({
      currentAverage: null,
      neededGrade: null,
      missingGradeIndex: null,
      canPass: false,
    })
    setIsCalculated(false)
  }

  const getGradeName = (index: number) => {
    const gradeNames = ["primeira", "segunda", "terceira", "quarta"]
    return gradeNames[index] || `${index + 1}ª`
  }

  const renderGradeInputs = () => {
    const currentGrades =
      disciplineType === "annual" ? grades : grades.slice(0, 2)

    return currentGrades.map((grade, index) => (
      <div key={index} className="space-y-2">
        <Label htmlFor={`grade-${index}`}>
          Nota {index + 1}{" "}
          <Badge variant="secondary" className="ml-2">
            Peso {grade.weight}
          </Badge>
        </Label>
        <Input
          id={`grade-${index}`}
          type="number"
          min="0"
          max="100"
          step="0.1"
          placeholder="0"
          value={grade.value}
          onChange={(e) => updateGrade(index, e.target.value)}
          disabled={isCalculated}
          className="w-full"
        />
      </div>
    ))
  }

  const renderResult = () => {
    if (!isCalculated || calculationResult.currentAverage === null) return null

    return (
      <div className="space-y-4">
        <div className="space-y-2 text-center">
          <h3 className="font-semibold text-lg">Média atual</h3>
          <div className="font-bold text-3xl text-primary">
            {calculationResult.currentAverage.toFixed(2)}
          </div>
          <Badge
            className={cn({
              "bg-green-500 hover:bg-green-500/80":
                calculationResult.currentAverage >= 60,
              "bg-yellow-500 hover:bg-yellow-500/80":
                calculationResult.currentAverage >= 40 &&
                calculationResult.currentAverage < 60,
              "bg-red-500 hover:bg-red-500/80":
                calculationResult.currentAverage < 40,
            })}
          >
            {calculationResult.canPass ? "Aprovado" : "Reprovado"}
          </Badge>
        </div>

        {calculationResult.missingGradeIndex !== null && (
          <div className="space-y-2 text-center">
            {calculationResult.neededGrade !== null ? (
              <p className="text-muted-foreground text-sm">
                Você não preencheu a{" "}
                {getGradeName(calculationResult.missingGradeIndex!)} avaliação,
                então precisa tirar{" "}
                <span className="font-semibold text-primary">
                  {calculationResult.neededGrade.toFixed(2)}
                </span>{" "}
                para passar.
              </p>
            ) : (
              <p className="text-muted-foreground text-sm">
                Você não preencheu a{" "}
                {getGradeName(calculationResult.missingGradeIndex!)} avaliação.
              </p>
            )}
            {!calculationResult.canPass && (
              <div className="flex items-center justify-center gap-2 text-red-500">
                <InfoIcon className="inline size-4" />
                <p className="text-sm">
                  Nota necessária é maior que 100, não é possível passar.
                </p>
              </div>
            )}
          </div>
        )}

        <div className="text-center text-muted-foreground text-sm">
          <p>Média mínima para aprovação: 60</p>
        </div>
      </div>
    )
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadora de Média IFRN",
    "description": "Ferramenta para calcular média ponderada no Instituto Federal do Rio Grande do Norte (IFRN)",
    "url": "https://ifrncalc.com/calculadora",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "BRL"
    },
    "creator": {
      "@type": "Person",
      "name": "Ruan Gustavo",
      "url": "https://www.linkedin.com/in/ruan-gustavo"
    },
    "audience": {
      "@type": "EducationalAudience",
      "educationalRole": "student"
    },
    "about": {
      "@type": "EducationalOrganization",
      "name": "Instituto Federal do Rio Grande do Norte",
      "alternateName": "IFRN"
    }
  }

  return (
    <div className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {session && <Header />}
      <div className="container mx-auto max-w-2xl px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-center sm:text-left">
              <Link
                href={session ? "/dashboard" : "/"}
                className="flex size-6 items-center justify-center gap-2 rounded-full bg-muted"
              >
                <ArrowLeft size={16} />
              </Link>
              Calculadora de média
            </CardTitle>
            <CardDescription className="text-center sm:text-left">
              Calcule a média ponderada para aprovação no curso
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label className="font-medium text-base">
                Tipo de disciplina
              </Label>
              <Tabs
                value={disciplineType}
                onValueChange={handleDisciplineTypeChange}
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="annual">Anual</TabsTrigger>
                  <TabsTrigger value="semester">Semestral</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div className="space-y-4">
              {!isCalculated ? (
                <>
                  <div className="space-y-4">{renderGradeInputs()}</div>
                  <div className="flex gap-3 pt-4">
                    <Button
                      variant="outline"
                      onClick={clearAll}
                      className="flex-1"
                    >
                      Limpar
                    </Button>
                    <Button
                      onClick={calculateAverage}
                      className="flex-1"
                      disabled={(disciplineType === "annual"
                        ? grades
                        : grades.slice(0, 2)
                      ).every((grade) => grade.value === "")}
                    >
                      Calcular média
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  {renderResult()}

                  <div className="flex gap-3 pt-4">
                    <Button onClick={clearAll} className="flex-1">
                      Novo cálculo
                    </Button>
                  </div>
                </>
              )}
            </div>
            {!isCalculated && (
              <div className="space-y-2 rounded-lg bg-muted/50 p-4">
                <h4 className="font-medium text-sm">Instruções:</h4>
                <ul className="list-inside list-disc space-y-1 text-muted-foreground text-sm">
                  {disciplineType === "annual" ? (
                    <>
                      <li>Digite as 4 notas da disciplina anual</li>
                      <li>Notas 1 e 2 têm peso 2</li>
                      <li>Notas 3 e 4 têm peso 3</li>
                    </>
                  ) : (
                    <>
                      <li>Digite as 2 notas da disciplina semestral</li>
                      <li>Nota 1 tem peso 2</li>
                      <li>Nota 2 tem peso 3</li>
                    </>
                  )}
                  <li>Use vírgula ou ponto para decimais</li>
                  <li>Notas devem estar entre 0 e 100</li>
                  <li>
                    Deixe uma nota em branco para calcular quanto precisa tirar
                    para passar
                  </li>
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      {session && <FeedbackDialog user={session.user} />}
    </div>
  )
}
