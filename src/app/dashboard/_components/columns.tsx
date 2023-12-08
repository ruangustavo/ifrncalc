"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { twJoin } from "tailwind-merge";

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
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0"
        >
          E1
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
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
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0"
        >
          E2
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
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
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0"
        >
          E3
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
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
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0"
        >
          E4
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
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
