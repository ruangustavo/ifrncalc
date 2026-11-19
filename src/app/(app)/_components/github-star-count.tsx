import { StarIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { z } from "zod"

const GithubRepoSchema = z.object({ stargazers_count: z.number() })

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
    const repo = GithubRepoSchema.safeParse(await response.json())

    return repo.success ? repo.data.stargazers_count : null
  } catch {
    return null
  }
}

export async function GithubStarCount() {
  const stars = await getStarCount()

  if (stars === null) return null

  return (
    <span className="inline-flex items-center gap-1 text-xs text-star">
      <HugeiconsIcon icon={StarIcon} className="size-3.5 fill-current" />
      {stars}
    </span>
  )
}
