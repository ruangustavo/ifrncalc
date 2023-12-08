"use client";

import { ColumnDef } from "@tanstack/react-table";
import { twJoin } from "tailwind-merge";
import { HeaderTable } from "./header-table";

interface Stage {
  grade: number | null;
  isAvailable: boolean;
  passingGrade: number;
}

export interface Discipline {
  name: string;
  E1: Stage;
  E2: Stage;
  E3: Stage;
  E4: Stage;
}

function getColorAccordingToGrade(grade: number) {
  if (grade <= 40) {
    return "text-green-600";
  }

  if (grade <= 90) {
    return "text-yellow-600";
  }

  return "text-red-600";
}

export const columns: ColumnDef<Discipline>[] = [
  {
    id: "Disciplina",
    header: "Disciplina",
    accessorKey: "name",
  },
  {
    id: "1° Bimestre",
    header: ({ column }) => <HeaderTable column={column} name="E1" />,
    accessorKey: "E1.passingGrade",
    cell: ({ row }) => {
      const { grade, isAvailable, passingGrade } = row.original.E1;

      if (!isAvailable && grade === null) {
        return <span>-</span>;
      }

      if (grade === null) {
        return (
          <span
            className={twJoin(
              "font-medium",
              getColorAccordingToGrade(passingGrade)
            )}
          >
            {passingGrade}
          </span>
        );
      }
      return <span>{grade}</span>;
    },
  },
  {
    id: "2° Bimestre",
    header: ({ column }) => <HeaderTable column={column} name="E2" />,
    accessorKey: "E2.passingGrade",
    cell: ({ row }) => {
      const { grade, isAvailable, passingGrade } = row.original.E2;

      if (!isAvailable && grade === null) {
        return <span>-</span>;
      }

      if (grade === null) {
        return (
          <span
            className={twJoin(
              "font-medium",
              getColorAccordingToGrade(passingGrade)
            )}
          >
            {passingGrade}
          </span>
        );
      }

      return <span>{grade}</span>;
    },
  },
  {
    id: "3° Bimestre",
    header: ({ column }) => <HeaderTable column={column} name="E3" />,
    accessorKey: "E3.passingGrade",
    cell: ({ row }) => {
      const { grade, isAvailable, passingGrade } = row.original.E3;

      if (!isAvailable && grade === null) {
        return <span>-</span>;
      }

      if (grade === null) {
        return (
          <span
            className={twJoin(
              "font-medium",
              getColorAccordingToGrade(passingGrade)
            )}
          >
            {passingGrade}
          </span>
        );
      }
      return <span>{grade}</span>;
    },
  },
  {
    id: "4° Bimestre",
    header: ({ column }) => <HeaderTable column={column} name="E4" />,
    accessorKey: "E4.passingGrade",
    cell: ({ row }) => {
      const { grade, isAvailable, passingGrade } = row.original.E4;

      if (!isAvailable && grade === null) {
        return <span>-</span>;
      }

      if (grade === null) {
        return (
          <span
            className={twJoin(
              "font-medium",
              getColorAccordingToGrade(passingGrade)
            )}
          >
            {passingGrade}
          </span>
        );
      }
      return <span>{grade}</span>;
    },
  },
];
