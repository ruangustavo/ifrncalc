import { useEffect, useState } from "react"
import { type Discipline, getGrades } from "@/actions/get-grades"

export function useGrades() {
  const [grades, setGrades] = useState<Discipline[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  async function fetchGrades() {
    try {
      setIsLoading(true)
      setError(null)
      const { grades } = await getGrades()
      if (grades) {
        setGrades(grades)
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch grades"))
    } finally {
      setIsLoading(false)
    }
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: it's not necessary to add `fetchGrades` as a dependency because it's a constant function
  useEffect(() => {
    fetchGrades()
  }, [])

  return {
    grades,
    isLoading,
    error,
    refetch: fetchGrades,
  }
}
