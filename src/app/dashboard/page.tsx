"use client";

import { Icons } from "@/components/icons";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";

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

  return (
    <main className="flex-1 grid place-content-center bg-slate-100">
      <DataTable columns={columns} data={grades} />
    </main>
  );
}
