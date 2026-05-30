import type { Discipline } from "@/actions/get-grades"

export const MOCK_GRADES: Discipline[] = [
  {
    // anual, E1=E2=E3=80, E4 aberta → (600-560)/3 ≈ 13 → verde
    name: "Matemática",
    hours: 80,
    partialAverage: null,
    E1: { grade: 80, isAvailable: false, passingGrade: 0 },
    E2: { grade: 80, isAvailable: false, passingGrade: 0 },
    E3: { grade: 80, isAvailable: false, passingGrade: 0 },
    E4: { grade: null, isAvailable: true, passingGrade: 0 },
  },
  {
    // anual, E1=E2=60, E3/E4 abertas → (600-240)/6 = 60 → amarelo
    name: "Português",
    hours: 80,
    partialAverage: null,
    E1: { grade: 60, isAvailable: false, passingGrade: 0 },
    E2: { grade: 60, isAvailable: false, passingGrade: 0 },
    E3: { grade: null, isAvailable: true, passingGrade: 0 },
    E4: { grade: null, isAvailable: true, passingGrade: 0 },
  },
  {
    // anual, E1=E2=10, E3/E4 abertas → (600-40)/6 ≈ 93 → vermelho
    name: "História",
    hours: 80,
    partialAverage: null,
    E1: { grade: 10, isAvailable: false, passingGrade: 0 },
    E2: { grade: 10, isAvailable: false, passingGrade: 0 },
    E3: { grade: null, isAvailable: true, passingGrade: 0 },
    E4: { grade: null, isAvailable: true, passingGrade: 0 },
  },
  {
    // anual, E1=E2=E3=0, E4 aberta → 600/3 = 200 → vermelho (impossível)
    name: "Física",
    hours: 80,
    partialAverage: null,
    E1: { grade: 0, isAvailable: false, passingGrade: 0 },
    E2: { grade: 0, isAvailable: false, passingGrade: 0 },
    E3: { grade: 0, isAvailable: false, passingGrade: 0 },
    E4: { grade: null, isAvailable: true, passingGrade: 0 },
  },
  {
    // semestral, E1=80, E2 aberta → (300-160)/3 ≈ 47 → amarelo
    name: "Geografia",
    hours: 40,
    partialAverage: null,
    E1: { grade: 80, isAvailable: false, passingGrade: 0 },
    E2: { grade: null, isAvailable: true, passingGrade: 0 },
    E3: { grade: null, isAvailable: false, passingGrade: -1 },
    E4: { grade: null, isAvailable: false, passingGrade: -1 },
  },
  {
    // semestral, E1=E2=70, sem abertas → mostra notas reais + média 70
    name: "Química",
    hours: 40,
    partialAverage: 70,
    E1: { grade: 70, isAvailable: false, passingGrade: 0 },
    E2: { grade: 70, isAvailable: false, passingGrade: 0 },
    E3: { grade: null, isAvailable: false, passingGrade: -1 },
    E4: { grade: null, isAvailable: false, passingGrade: -1 },
  },
]
