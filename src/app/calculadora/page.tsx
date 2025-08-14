"use client"

import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { Header } from "@/app/dashboard/_components/header"
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

type DisciplineType = "annual" | "semester"

interface GradeInput {
  value: string
  weight: number
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
  const [calculatedAverage, setCalculatedAverage] = useState<number | null>(
    null,
  )
  const [isCalculated, setIsCalculated] = useState(false)

  const updateGrade = (index: number, value: string) => {
    const newGrades = [...grades]
    newGrades[index] = { ...newGrades[index], value }
    setGrades(newGrades)
  }

  const calculateAverage = () => {
    const validGrades = grades.filter((grade) => grade.value !== "")

    if (validGrades.length === 0) return

    const totalWeightedSum = validGrades.reduce((sum, grade) => {
      return sum + parseFloat(grade.value) * grade.weight
    }, 0)

    const totalWeight = validGrades.reduce(
      (sum, grade) => sum + grade.weight,
      0,
    )
    const average = totalWeightedSum / totalWeight

    setCalculatedAverage(average)
    setIsCalculated(true)
  }

  const clearAll = () => {
    setGrades([
      { value: "", weight: 2 },
      { value: "", weight: 2 },
      { value: "", weight: 3 },
      { value: "", weight: 3 },
    ])
    setCalculatedAverage(null)
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

    setCalculatedAverage(null)
    setIsCalculated(false)
  }

  const getApprovalStatus = (average: number) => {
    if (average >= 7.0) return { status: "Aprovado", color: "bg-green-500" }
    if (average >= 5.0) return { status: "Recuperação", color: "bg-yellow-500" }
    return { status: "Reprovado", color: "bg-red-500" }
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
          max="10"
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
    if (!isCalculated || calculatedAverage === null) return null

    const approvalInfo = getApprovalStatus(calculatedAverage)

    return (
      <div className="space-y-4">
        <div className="space-y-2 text-center">
          <h3 className="font-semibold text-lg">Média calculada</h3>
          <div className="font-bold text-3xl text-primary">
            {calculatedAverage.toFixed(2)}
          </div>
          <Badge className={`${approvalInfo.color} text-white`}>
            {approvalInfo.status}
          </Badge>
        </div>

        <div className="text-center text-muted-foreground text-sm">
          <p>Média mínima para aprovação: 60</p>
        </div>
      </div>
    )
  }

  return (
    <>
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
                      disabled={grades.every((grade) => grade.value === "")}
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
                  <li>Notas devem estar entre 0 e 10</li>
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  )
}
