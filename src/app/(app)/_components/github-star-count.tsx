import { Star } from "lucide-react"

interface GithubRepo {
  stargazers_count: number
}

async function getStarCount(): Promise<number | null> {
  try {
    const response = await fetch(
      "https://api.github.com/repos/ruangustavo/ifrncalc",
      {
        headers: { Accept: "application/vnd.github+json" },
        next: { revalidate: 60 * 60 },
      },
    )
    if (!response.ok) return null
    const data = (await response.json()) as GithubRepo
    return data.stargazers_count
  } catch {
    return null
  }
}

export async function GithubStarCount() {
  const stars = await getStarCount()
  if (stars === null) return null

  return (
    <span className="inline-flex items-center gap-1 text-xs text-yellow-500">
      <Star className="size-3 fill-current" />
      {stars}
    </span>
  )
}
