'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useGrades } from '../hooks'
import { columns } from './_components/columns'
import { DataTable, DataTableSkeleton } from './_components/data-table'

export default function Dashboard() {
  const { status } = useSession()
  const { grades, error, isLoading } = useGrades()

  if (status === 'unauthenticated') {
    redirect('/')
  }

  if (error) {
    return (
      <main className="grid h-screen place-content-center">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Erro ao carregar suas notas 😢
        </h1>
      </main>
    )
  }

  return (
    <main className="flex-1 bg-secondary px-4 md:grid md:place-content-center">
      {isLoading && <DataTableSkeleton />}
      {grades && <DataTable columns={columns} data={grades} />}
    </main>
  )
}
