import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { STAGES } from "./stages"

export function TableSkeleton() {
  return (
    <div className="overflow-hidden rounded-3xl bg-card ring-1 ring-foreground/10">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-full md:w-[300px]">
              <Skeleton className="h-4 w-20" />
            </TableHead>
            <TableHead className="hidden md:table-cell">
              <Skeleton className="h-4 w-6" />
            </TableHead>
            <TableHead className="hidden md:table-cell">
              <Skeleton className="h-4 w-6" />
            </TableHead>
            <TableHead className="hidden md:table-cell">
              <Skeleton className="h-4 w-6" />
            </TableHead>
            <TableHead className="hidden md:table-cell">
              <Skeleton className="h-4 w-6" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 6 }).map((_row, rowIndex) => (
            <TableRow key={rowIndex}>
              <TableCell>
                <Skeleton className="h-4 w-40" />
                <dl className="mt-2 space-y-2 md:hidden">
                  {STAGES.map(() => (
                    <dd
                      key={crypto.randomUUID()}
                      className="flex items-center gap-1.5"
                    >
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-8" />
                    </dd>
                  ))}
                </dl>
              </TableCell>
              {Array.from({ length: 4 }).map((_cell, columnIndex) => (
                <TableCell key={columnIndex} className="hidden md:table-cell">
                  <Skeleton className="h-4 w-8" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
