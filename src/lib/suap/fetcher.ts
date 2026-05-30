import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

/**
 * Mutator used by the orval-generated SUAP client.
 *
 * The generated functions call this with a path-only `url` (the spec has
 * `servers: []`, so there is no baseURL) and a `RequestInit`. We prefix
 * `SUAP_URL`, inject the bearer token from the server session, and return the
 * `{ status, data }` shape the generated response unions expect — preserving
 * the per-status branching at the call sites.
 */
export const suapFetch = async <T>(
  url: string,
  options?: RequestInit,
): Promise<T> => {
  const session = await getServerSession(authOptions)
  const accessToken = session?.accessToken

  const headers = new Headers(options?.headers)
  headers.set("Content-Type", "application/json")
  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`)
  }

  const response = await fetch(`${process.env.SUAP_URL}${url}`, {
    ...options,
    headers,
  })

  const data = await response.json().catch(() => null)

  return { status: response.status, data, headers: response.headers } as T
}
