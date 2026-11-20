"use client"

import { createContext, type ReactNode, useContext, useState } from "react"
import { createStore, type StoreApi, useStore } from "zustand"

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

export type GradesScope =
  | { kind: "student"; onGradeSimulated: () => Promise<void> }
  | { kind: "demo" }

function createGradesStore() {
  return createStore<GradesStore>((set) => ({
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
}

const studentStore = createGradesStore()

interface GradesContextValue {
  store: StoreApi<GradesStore>
  scope: GradesScope
}

const GradesContext = createContext<GradesContextValue | null>(null)

export function GradesProvider({
  scope,
  children,
}: {
  scope: GradesScope
  children: ReactNode
}) {
  const [store] = useState(() =>
    scope.kind === "student" ? studentStore : createGradesStore(),
  )

  return <GradesContext value={{ store, scope }}>{children}</GradesContext>
}

export function useGradesStore(): GradesStore {
  const context = useContext(GradesContext)

  if (!context) {
    throw new Error("useGradesStore must be used inside a GradesProvider")
  }

  const { store, scope } = context
  const grades = useStore(store)

  return {
    ...grades,
    setGrade: (disciplineName, stage, grade) => {
      grades.setGrade(disciplineName, stage, grade)

      if (scope.kind === "student") {
        void scope.onGradeSimulated()
      }
    },
  }
}
