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
      <CredenzaContent className="sm:max-w-[425px] mx-auto">
        <CredenzaHeader>
          <CredenzaTitle>
            Editar nota - {disciplineName} ({stage})
          </CredenzaTitle>
        </CredenzaHeader>
        <form onSubmit={handleSubmit} className="p-4 md:p-0">
          <div className="grid gap-4 py-6 md:py-0 md:mb-2">
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
                className="col-span-3 text-base"
              />
            </div>
          </div>
          <CredenzaFooter className="p-0 md:p-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="text-base md:text-sm"
            >
              Cancelar
            </Button>
            <Button type="submit" className="text-base md:text-sm">
              Salvar
            </Button>
          </CredenzaFooter>
        </form>
      </CredenzaContent>
    </Credenza>
  )
}
