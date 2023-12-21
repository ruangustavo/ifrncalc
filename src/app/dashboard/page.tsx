'use client'

import { Icons } from '@/components/icons'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { DataTable } from './_components/data-table'
import { columns } from './_components/columns'
import { useGrades } from '../hooks'
import { Header } from './_components/header'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'
import { ArrowUpDown } from 'lucide-react'

export default function Dashboard() {
  const { status } = useSession()
  const { grades, error, isLoading } = useGrades()

  if (status === 'unauthenticated') {
    redirect('/')
  }

  if (error) {
    return (
      <main className="h-screen grid place-content-center">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Erro ao carregar suas notas 😢
        </h1>
      </main>
    )
  }

  return (
    <>
      <Header />
      <main className="flex-1 bg-secondary px-4 md:grid md:place-content-center">
        {isLoading && <DataTableSkeleton />}
        {grades && <DataTable columns={columns} data={grades} />}
      </main>
    </>
  )
}

function DataTableSkeleton() {
  const NUMBER_OF_ROWS = 12
  const NUMBER_OF_COLUMNS = 5

  return (
    <div className="w-full md:w-[40vw] border shadow-sm mt-12">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Disciplina</TableHead>
            <TableHead>
              <span className="inline-flex items-center justify-center">
                E1
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </span>
            </TableHead>
            <TableHead>
              <span className="inline-flex items-center justify-center">
                E2
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </span>
            </TableHead>
            <TableHead>
              <span className="inline-flex items-center justify-center">
                E3
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </span>
            </TableHead>
            <TableHead>
              <span className="inline-flex items-center justify-center">
                E4
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: NUMBER_OF_ROWS }).map((_, i) => (
            <TableRow key={i}>
              {Array.from({ length: NUMBER_OF_COLUMNS }).map((_, i) => (
                <TableCell key={i}>
                  {i === 0 ? (
                    <Skeleton className="w-[150px] h-4" />
                  ) : (
                    <Skeleton className="w-[25px] h-4" />
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
