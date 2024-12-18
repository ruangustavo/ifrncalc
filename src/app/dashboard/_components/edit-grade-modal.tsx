'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Editar nota - {disciplineName} ({stage})
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
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
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Salvar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
