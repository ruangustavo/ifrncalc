"use client";

import { ArrowLeft, CheckCircle2, Info } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useMemo, useState } from "react";
import { Header } from "@/app/dashboard/_components/header";
import { FeedbackDialog } from "@/components/feedback-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const PASSING_AVERAGE = 60;

type DisciplineType = "annual" | "semester";

interface GradeInput {
  value: string;
  weight: number;
}

const ANNUAL_GRADES: GradeInput[] = [
  { value: "", weight: 2 },
  { value: "", weight: 2 },
  { value: "", weight: 3 },
  { value: "", weight: 3 },
];

const SEMESTER_GRADES: GradeInput[] = [
  { value: "", weight: 2 },
  { value: "", weight: 3 },
];

type CalcResult =
  | { kind: "empty" }
  | { kind: "partial"; average: number; blanks: number }
  | { kind: "needed"; needed: number; average: number; missingIndex: number }
  | { kind: "secured"; average: number; missingIndex: number }
  | {
      kind: "impossible";
      needed: number;
      average: number;
      missingIndex: number;
    }
  | { kind: "final"; average: number; passed: boolean };

function parseGrade(value: string): number | null {
  if (value.trim() === "") return null;
  const parsed = Number.parseFloat(value);
  return Number.isNaN(parsed) ? null : parsed;
}

function computeResult(active: GradeInput[]): CalcResult {
  const parsed = active.map((g) => ({
    value: parseGrade(g.value),
    weight: g.weight,
  }));
  const filled = parsed.filter(
    (g): g is { value: number; weight: number } => g.value !== null,
  );

  if (filled.length === 0) return { kind: "empty" };

  const filledWeightedSum = filled.reduce((s, g) => s + g.value * g.weight, 0);
  const filledWeight = filled.reduce((s, g) => s + g.weight, 0);
  const partialAverage = filledWeightedSum / filledWeight;
  const blanks = parsed.length - filled.length;

  if (blanks === 0) {
    return {
      kind: "final",
      average: partialAverage,
      passed: partialAverage >= PASSING_AVERAGE,
    };
  }

  if (blanks > 1) {
    return { kind: "partial", average: partialAverage, blanks };
  }

  const missingIndex = parsed.findIndex((g) => g.value === null);
  const missingWeight = parsed[missingIndex].weight;
  const totalWeight = parsed.reduce((s, g) => s + g.weight, 0);
  const needed =
    (PASSING_AVERAGE * totalWeight - filledWeightedSum) / missingWeight;

  if (needed <= 0)
    return { kind: "secured", average: partialAverage, missingIndex };
  if (needed > 100)
    return {
      kind: "impossible",
      needed,
      average: partialAverage,
      missingIndex,
    };
  return { kind: "needed", needed, average: partialAverage, missingIndex };
}

const GRADE_NAMES = ["primeira", "segunda", "terceira", "quarta"] as const;

function getGradeName(index: number) {
  return GRADE_NAMES[index] ?? `${index + 1}ª`;
}

function formatGrade(value: number) {
  return value.toFixed(2);
}

function neededHint(needed: number) {
  if (needed <= 40) return "fácil de alcançar";
  if (needed <= 90) return "alcançável";
  return "difícil de alcançar";
}

export default function Calculadora() {
  const { data: session } = useSession();
  const [disciplineType, setDisciplineType] =
    useState<DisciplineType>("annual");
  const [grades, setGrades] = useState<GradeInput[]>(ANNUAL_GRADES);

  const activeGrades =
    disciplineType === "annual" ? grades : grades.slice(0, 2);

  const result = useMemo(
    () =>
      computeResult(disciplineType === "annual" ? grades : grades.slice(0, 2)),
    [grades, disciplineType],
  );

  const updateGrade = (index: number, value: string) => {
    setGrades((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], value };
      return next;
    });
  };

  const clearAll = () => {
    setGrades(disciplineType === "annual" ? ANNUAL_GRADES : SEMESTER_GRADES);
  };

  const handleDisciplineTypeChange = (value: string) => {
    const type = value as DisciplineType;
    setDisciplineType(type);
    setGrades(type === "annual" ? ANNUAL_GRADES : SEMESTER_GRADES);
  };

  const renderResult = () => {
    if (result.kind === "empty") return null;

    return (
      <div className="fade-in slide-in-from-bottom-1 animate-in rounded-xl border bg-muted/30 p-5 duration-200 motion-reduce:animate-none">
        {result.kind === "partial" && (
          <div className="space-y-1.5 text-center">
            <p className="text-muted-foreground text-xs">
              Média parcial das notas lançadas
            </p>
            <p className="font-medium text-2xl tabular-nums">
              {formatGrade(result.average)}
            </p>
            <p className="text-muted-foreground text-sm">
              Preencha as outras notas e deixe apenas uma em branco para ver
              quanto precisa.
            </p>
          </div>
        )}

        {result.kind === "needed" && (
          <div className="space-y-4">
            <div className="space-y-2 text-center">
              <p className="text-muted-foreground text-sm">
                Você precisa tirar
              </p>
              <p
                className={cn(
                  "font-semibold text-5xl tabular-nums tracking-tight transition-colors",
                  {
                    "text-green-500": result.needed <= 40,
                    "text-yellow-500":
                      result.needed > 40 && result.needed <= 90,
                    "text-red-500": result.needed > 90,
                  },
                )}
              >
                {formatGrade(result.needed)}
              </p>
              <p className="text-muted-foreground text-sm">
                na {getGradeName(result.missingIndex)} avaliação ·{" "}
                {neededHint(result.needed)}
              </p>
            </div>
            <p className="border-t pt-3 text-center text-muted-foreground text-xs tabular-nums">
              Média parcial: {formatGrade(result.average)}
            </p>
          </div>
        )}

        {result.kind === "secured" && (
          <div className="space-y-2 text-center">
            <CheckCircle2 className="mx-auto size-8 text-green-500" />
            <p className="font-semibold text-2xl text-green-600 dark:text-green-500">
              Aprovação garantida
            </p>
            <p className="text-muted-foreground text-sm">
              Você já atingiu os 60 e passa independentemente da última nota.
            </p>
            <p className="text-muted-foreground text-xs tabular-nums">
              Média parcial: {formatGrade(result.average)}
            </p>
          </div>
        )}

        {result.kind === "impossible" && (
          <div className="space-y-2 text-center">
            <Info className="mx-auto size-8 text-red-500" />
            <p className="font-semibold text-2xl text-red-600 dark:text-red-500">
              Não é possível atingir os 60
            </p>
            <p className="text-muted-foreground text-sm">
              Seria necessária uma nota acima de 100 nesta avaliação.
            </p>
            <p className="text-muted-foreground text-xs tabular-nums">
              Média parcial: {formatGrade(result.average)}
            </p>
          </div>
        )}

        {result.kind === "final" && (
          <div className="space-y-3 text-center">
            <p className="text-muted-foreground text-sm">Média final</p>
            <p className="font-semibold text-5xl tabular-nums tracking-tight">
              {formatGrade(result.average)}
            </p>
            {result.passed ? (
              <div className="inline-flex items-center gap-1.5 text-primary">
                <CheckCircle2 className="size-4" />
                <span className="font-medium text-sm">Aprovado</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-1.5 text-muted-foreground">
                <Info className="size-4" />
                <span className="font-medium text-sm">Não atingiu os 60</span>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

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
  };

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
            <div className="flex flex-col gap-3">
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
              {activeGrades.map((grade, index) => (
                <div key={index} className="flex flex-col gap-1">
                  <Label htmlFor={`grade-${index}`}>
                    Nota {index + 1}{" "}
                    <Badge
                      variant="secondary"
                      className="pointer-events-none ml-2"
                    >
                      Peso {grade.weight}
                    </Badge>
                  </Label>
                  <Input
                    id={`grade-${index}`}
                    type="number"
                    inputMode="decimal"
                    min="0"
                    max="100"
                    step="0.1"
                    placeholder="0"
                    value={grade.value}
                    onChange={(e) => updateGrade(index, e.target.value)}
                    className="w-full"
                  />
                </div>
              ))}
            </div>

            {renderResult()}

            {result.kind !== "empty" && (
              <Button variant="outline" onClick={clearAll} className="w-full">
                Limpar
              </Button>
            )}

            <div className="flex flex-col gap-2 rounded-lg bg-muted/50 p-4">
              <h4 className="font-medium text-sm">Instruções:</h4>
              <ul className="flex list-inside list-disc flex-col gap-1 text-muted-foreground text-sm">
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
                <li>Notas devem estar entre 0 e 100</li>
                <li>
                  Deixe uma nota em branco para ver quanto precisa tirar para
                  passar
                </li>
                <li>Média mínima para aprovação: 60</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
      {session && <FeedbackDialog user={session.user} />}
    </div>
  );
}
