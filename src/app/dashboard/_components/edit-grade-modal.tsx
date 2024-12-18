'use client'

import { Button } from '@/components/ui/button'
import {
  Credenza,
  CredenzaContent,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
} from '@/components/ui/credenza'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'

interface EditGradeModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (grade: number) => void
  disciplineName: string
  stage: string
}

export function EditGradeModal({
  isOpen,
  onClose,
  onSubmit,
  disciplineName,
  stage,
}: EditGradeModalProps) {
  const [grade, setGrade] = useState<string>('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const numGrade = Number.parseFloat(grade)
    if (numGrade >= 0 && numGrade <= 100) {
      onSubmit(numGrade)
      onClose()
      setGrade('')
    }
  }

  return (
    <Credenza open={isOpen} onOpenChange={onClose}>
      <CredenzaContent className="sm:max-w-[425px]">
        <CredenzaHeader>
          <CredenzaTitle>
            Editar nota - {disciplineName} ({stage})
          </CredenzaTitle>
        </CredenzaHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 p-4 md:px-0 md:py-4">
            <div className="grid gap-2">
              <Label htmlFor="grade">Nota</Label>
              <Input
                id="grade"
                type="number"
                min="0"
                max="100"
                value={grade}
                onChange={e => setGrade(e.target.value)}
                placeholder="Digite a nota..."
                className="col-span-3"
              />
            </div>
          </div>
          <CredenzaFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Salvar</Button>
          </CredenzaFooter>
        </form>
      </CredenzaContent>
    </Credenza>
  )
}
