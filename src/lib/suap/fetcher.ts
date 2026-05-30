import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

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
