"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Icons } from "@/components/icons";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { twJoin } from "tailwind-merge";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Dashboard() {
  const { status } = useSession();
  const { data: grades, error, isLoading } = useSWR("/api/grades", fetcher);

  if (status === "unauthenticated") {
    redirect("/");
  }

  if (isLoading) {
    return (
      <main className="h-screen grid place-content-center">
        <Icons.spinner className="w-12 h-12 animate-spin" />
      </main>
    );
  }

  if (error) {
    return (
      <main className="h-screen grid place-content-center">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Erro ao carregar suas notas 😢
        </h1>
      </main>
    );
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

  return (
    <main className="flex-1 grid place-content-center bg-slate-100">
      <div className="rounded-md border bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableHead>Disciplina</TableHead>
            <TableHead>E1</TableHead>
            <TableHead>E2</TableHead>
            <TableHead>E3</TableHead>
            <TableHead>E4</TableHead>
          </TableHeader>
          <TableBody>
            {grades.map((grade: any) => (
              <TableRow key={grade.codigo_diario}>
                <TableCell>{grade.disciplina}</TableCell>
                {[1, 2, 3, 4].map((etapa) => (
                  <TableCell key={etapa}>
                    {etapa <= grade.quantidade_avaliacoes ? (
                      <span
                        className={twJoin(
                          grade[`nota_etapa_${etapa}`].nota === null &&
                            getColorAccordingToGrade(grade.nota_para_passar),
                          grade[`nota_etapa_${etapa}`].nota === null &&
                            "font-semibold"
                        )}
                      >
                        {/* Se a nota da etapa atual for nula, significa que não teve aula ainda */}
                        {/* Portanto, exiba a nota necessária para passar de ano  */}
                        {grade[`nota_etapa_${etapa}`].nota === null
                          ? grade.nota_para_passar
                          : grade[`nota_etapa_${etapa}`].nota}
                      </span>
                    ) : (
                      <span>-</span>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
