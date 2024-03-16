import {
  TableCell,
  TableRow,
  Table,
  TableBody,
  TableHead,
  TableHeader,
} from '@/components/ui/table'

import { Button } from '@/components/ui/button'
import { ArrowUpDown, Filter } from 'lucide-react'
import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

function HeaderTableSkeleton({ name }: { name: string }) {
  return (
    <Button variant="ghost" className="p-0">
      {name}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  )
}

export default function DashboardLoading() {
  const tableHeaders = [
    'Disciplina',
    <HeaderTableSkeleton key={0} name="E1" />,
    <HeaderTableSkeleton key={1} name="E2" />,
    <HeaderTableSkeleton key={2} name="E3" />,
    <HeaderTableSkeleton key={3} name="E4" />,
  ]

  return (
    <div className="mt-2 flex flex-col gap-2">
      <div className="self-end">
        <Button variant="outline" className="ml-auto">
          <Filter size={16} />
          <span className="sr-only">Filtrar bimestres</span>
        </Button>
      </div>
      <div className="rounded-md border bg-card">
        <Table className="min-h-max">
          <TableHeader>
            <TableRow>
              {tableHeaders.map((header, index) => (
                <TableHead key={index}>{header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array(12)
              .fill(null)
              .map((_, rowIndex) => (
                <TableRow key={rowIndex}>
                  {Array(5)
                    .fill(null)
                    .map((_, cellIndex) => (
                      <TableCell key={cellIndex}>
                        {cellIndex === 0 ? (
                          <Skeleton className="h-2.5 w-[200px]" />
                        ) : (
                          <Skeleton className="h-2.5 w-[50px]" />
                        )}
                      </TableCell>
                    ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
