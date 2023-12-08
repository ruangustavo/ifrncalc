import useSWR from "swr";

export function useGrades() {
  const { data: grades, error, isLoading } = useSWR("/api/grades");
  return { grades, error, isLoading };
}
