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
      <ArrowUpDown className="ml-2 size-4" />
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
    <div className="size-full space-y-2 pt-2.5">
      <div className="flex items-center justify-between gap-4">
        <Skeleton className="h-2.5 w-[300px]" />
        <Button
          variant="outline"
          size="xs"
          className="flex items-center gap-2"
          disabled
        >
          <Filter size={12} />
          <span className="sr-only md:not-sr-only">Filtrar bimestres</span>
        </Button>
      </div>
      <div className="rounded-md border border-foreground/5 bg-card">
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
                          <Skeleton className="h-2.5 w-[250px]" />
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
