import { getGrades } from '@/actions/get-grades'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { CellTable, getGradeOrPassingGrade } from './cell-table'

export async function TableGrades() {
  const { grades } = await getGrades()

  return (
    <div className="mt-4 rounded-md border border-foreground/5 bg-card">
      <Table>
        <TableCaption className="block caption-top text-xs md:hidden md:text-sm">
          As notas coloridas são as médias necessárias para ser aprovado
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-full md:w-[300px]">Disciplina</TableHead>
            <TableHead className="hidden md:table-cell">E1</TableHead>
            <TableHead className="hidden md:table-cell">E2</TableHead>
            <TableHead className="hidden md:table-cell">E3</TableHead>
            <TableHead className="hidden md:table-cell">E4</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {grades?.map((grade) => (
            <TableRow key={grade.name}>
              <TableCell className="font-medium">
                <span className="font-semibold">{grade.name}</span>

                <dl className="font-normal md:hidden">
                  <dt className="sr-only">E1</dt>
                  <dd className="leading-relaxed">
                    1° Bimestre: {getGradeOrPassingGrade(grade.E1)}
                  </dd>
                  <dt className="sr-only">E2</dt>
                  <dd className="leading-relaxed">
                    2° Bimestre: {getGradeOrPassingGrade(grade.E2)}
                  </dd>
                  <dt className="sr-only">E3</dt>
                  <dd className="leading-relaxed">
                    3° Bimestre: {getGradeOrPassingGrade(grade.E3)}
                  </dd>
                  <dt className="sr-only">E4</dt>
                  <dd className="leading-relaxed">
                    4° Bimestre: {getGradeOrPassingGrade(grade.E4)}
                  </dd>
                </dl>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <CellTable
                  stage={{
                    grade: grade.E1.grade,
                    isAvailable: grade.E1.isAvailable,
                    passingGrade: grade.E1.passingGrade,
                  }}
                />
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <CellTable
                  stage={{
                    grade: grade.E2.grade,
                    isAvailable: grade.E2.isAvailable,
                    passingGrade: grade.E2.passingGrade,
                  }}
                />
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <CellTable
                  stage={{
                    grade: grade.E3.grade,
                    isAvailable: grade.E3.isAvailable,
                    passingGrade: grade.E3.passingGrade,
                  }}
                />
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <CellTable
                  stage={{
                    grade: grade.E4.grade,
                    isAvailable: grade.E4.isAvailable,
                    passingGrade: grade.E4.passingGrade,
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
