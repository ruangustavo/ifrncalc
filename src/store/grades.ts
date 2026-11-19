import { create } from "zustand"

interface EditedGrades {
  [disciplineName: string]: {
    [stage: string]: number
  }
}

interface GradesStore {
  editedGrades: EditedGrades
  setGrade: (disciplineName: string, stage: string, grade: number) => void
  clearEditedGrades: () => void
}

export const useGradesStore = create<GradesStore>((set) => ({
  editedGrades: {},
  setGrade: (disciplineName, stage, grade) =>
    set((state) => ({
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
