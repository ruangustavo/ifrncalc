"use client";

import { ColumnDef } from "@tanstack/react-table";
import { HeaderTable } from "./header-table";
import { CellTable } from "./cell-table";

export interface Stage {
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
    cell: ({ row }) => <CellTable stage={row.original.E1} />,
  },
  {
    id: "2° Bimestre",
    header: ({ column }) => <HeaderTable column={column} name="E2" />,
    accessorKey: "E2.passingGrade",
    cell: ({ row }) => <CellTable stage={row.original.E2} />,
  },
  {
    id: "3° Bimestre",
    header: ({ column }) => <HeaderTable column={column} name="E3" />,
    accessorKey: "E3.passingGrade",
    cell: ({ row }) => <CellTable stage={row.original.E3} />,
  },
  {
    id: "4° Bimestre",
    header: ({ column }) => <HeaderTable column={column} name="E4" />,
    accessorKey: "E4.passingGrade",
    cell: ({ row }) => <CellTable stage={row.original.E4} />,
  },
];
