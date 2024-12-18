import type { Discipline } from '@/actions/get-grades'
import { create } from 'zustand'

export interface EditedGrade {
  disciplineName: string
  stage: 'E1' | 'E2' | 'E3' | 'E4'
  grade: number
}

export interface EditedGrades {
  [disciplineName: string]: {
    [stage: string]: number
  }
}

interface GradesStore {
  editedGrades: EditedGrades
  originalGrades: Discipline[]
  setGrade: (disciplineName: string, stage: string, grade: number) => void
  clearEditedGrades: () => void
  setOriginalGrades: (grades: Discipline[]) => void
}

export const useGradesStore = create<GradesStore>(set => ({
  editedGrades: {},
  originalGrades: [],
  setOriginalGrades: grades => set({ originalGrades: grades }),
  setGrade: (disciplineName, stage, grade) =>
    set(state => ({
      editedGrades: {
        ...state.editedGrades,
        [disciplineName]: {
          ...state.editedGrades[disciplineName],
          [stage]: grade,
        },
      },
    })),
  clearEditedGrades: () => set({ editedGrades: {} }),
}))
