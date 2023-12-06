"use client";

import { ColumnDef, Row } from "@tanstack/react-table";
import { twJoin } from "tailwind-merge";

type Grade = {
  nota: number | null;
  faltas: number;
};

export type DisciplineGrade = {
  disciplina: string;
  nota_etapa_1: Grade;
  nota_etapa_2: Grade;
  nota_etapa_3: Grade;
  nota_etapa_4: Grade;
  nota_para_passar: number;
  quantidade_avaliacoes: number;
};

function getColorAccordingToGrade(grade: number) {
  if (grade <= 40) {
    return "text-green-600";
  }

  if (grade <= 90) {
    return "text-yellow-600";
  }

  return "text-red-600";
}

export const columns: ColumnDef<DisciplineGrade>[] = [
  {
    id: "disciplina",
    header: "Disciplina",
    accessorKey: "disciplina",
  },
  {
    id: "1",
    header: "E1",
    accessorKey: "nota_etapa_1.nota",
    cell: ({ row, cell }) => {
      const [, disciplineId] = cell.id.split("_");

      const grade = row.original.nota_etapa_1.nota;

      if (Number(disciplineId) > row.original.quantidade_avaliacoes) {
        return <span>-</span>;
      }

      if (grade === null) {
        const gradeNeededToPass = row.original.nota_para_passar;

        return (
          <span
            className={twJoin(
              "font-medium",
              getColorAccordingToGrade(gradeNeededToPass)
            )}
          >
            {gradeNeededToPass}
          </span>
        );
      }
      return <span>{grade}</span>;
    },
  },
  {
    id: "2",
    header: "E2",
    accessorKey: "nota_etapa_2.nota",
    cell: ({ row, cell }) => {
      const [, disciplineId] = cell.id.split("_");

      const grade = row.original.nota_etapa_2.nota;

      if (Number(disciplineId) > row.original.quantidade_avaliacoes) {
        return <span>-</span>;
      }

      if (grade === null) {
        const gradeNeededToPass = row.original.nota_para_passar;

        return (
          <span
            className={twJoin(
              "font-medium",
              getColorAccordingToGrade(gradeNeededToPass)
            )}
          >
            {gradeNeededToPass}
          </span>
        );
      }
      return <span>{grade}</span>;
    },
  },
  {
    id: "3",
    header: "E3",
    accessorKey: "nota_etapa_3.nota",
    cell: ({ row, cell }) => {
      const [, disciplineId] = cell.id.split("_");

      const grade = row.original.nota_etapa_3.nota;

      if (Number(disciplineId) > row.original.quantidade_avaliacoes) {
        return <span>-</span>;
      }

      if (grade === null) {
        const gradeNeededToPass = row.original.nota_para_passar;

        return (
          <span
            className={twJoin(
              "font-medium",
              getColorAccordingToGrade(gradeNeededToPass)
            )}
          >
            {gradeNeededToPass}
          </span>
        );
      }

      return <span>{grade}</span>;
    },
  },
  {
    id: "4",
    header: "E4",
    accessorKey: "nota_etapa_4.nota",
    cell: ({ row, cell }) => {
      const [, disciplineId] = cell.id.split("_");
      const grade = row.original.nota_etapa_4.nota;

      if (Number(disciplineId) > row.original.quantidade_avaliacoes) {
        return <span>-</span>;
      }

      if (grade === null) {
        const gradeNeededToPass = row.original.nota_para_passar;

        return (
          <span
            className={twJoin(
              "font-medium",
              getColorAccordingToGrade(gradeNeededToPass)
            )}
          >
            {gradeNeededToPass}
          </span>
        );
      }

      return <span>{grade}</span>;
    },
  },
];
