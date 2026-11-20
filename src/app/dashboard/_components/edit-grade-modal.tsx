"use client"

import type { Discipline } from "@/actions/get-grades"
import {
  Credenza,
  CredenzaContent,
  CredenzaDescription,
  CredenzaHeader,
  CredenzaTitle,
} from "@/components/ui/credenza"
import type { StageKey } from "@/utils/grade-calculation"

import { GradeSimulator } from "./grade-simulator"
import { STAGES } from "./stages"

interface EditGradeModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (grade: number) => void
  discipline: Discipline
  editedGrades: Record<string, number>
  stage: StageKey
}

export function EditGradeModal({
  isOpen,
  onClose,
  onSubmit,
  discipline,
  editedGrades,
  stage,
}: EditGradeModalProps) {
  return (
    <Credenza open={isOpen} onOpenChange={onClose}>
      <CredenzaContent className="mx-auto grid-cols-1 sm:max-w-[425px]">
        <CredenzaHeader>
          <CredenzaTitle>Simular nota</CredenzaTitle>
          <CredenzaDescription>
            {discipline.name} ·{" "}
            {STAGES.find(({ key }) => key === stage)?.label ?? stage}
          </CredenzaDescription>
        </CredenzaHeader>
        <GradeSimulator
          discipline={discipline}
          editedGrades={editedGrades}
          stage={stage}
          onSubmit={onSubmit}
          onClose={onClose}
        />
      </CredenzaContent>
    </Credenza>
  )
}
