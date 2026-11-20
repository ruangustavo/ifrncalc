"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Credenza,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
} from "@/components/ui/credenza"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { STAGES } from "./stages"

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
  const [grade, setGrade] = useState<string>("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const numGrade = Number.parseFloat(grade)

    if (numGrade >= 0 && numGrade <= 100) {
      onSubmit(numGrade)
      onClose()
      setGrade("")
    }
  }

  return (
    <Credenza open={isOpen} onOpenChange={onClose}>
      <CredenzaContent className="mx-auto sm:max-w-[425px]">
        <CredenzaHeader>
          <CredenzaTitle>Simular nota</CredenzaTitle>
          <CredenzaDescription>
            {disciplineName} ·{" "}
            {STAGES.find(({ key }) => key === stage)?.label ?? stage}
          </CredenzaDescription>
        </CredenzaHeader>
        <form onSubmit={handleSubmit} className="p-4 md:p-0">
          <div className="grid gap-4 py-6 md:mb-2 md:py-0">
            <div className="grid gap-2">
              <Label htmlFor="grade">Nota</Label>
              <Input
                id="grade"
                type="number"
                inputMode="decimal"
                min="0"
                max="100"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                placeholder="0 a 100"
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
