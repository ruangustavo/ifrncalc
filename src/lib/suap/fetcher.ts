import { getServerSession } from "next-auth"
import { cookies } from "next/headers"

import { authOptions } from "@/lib/auth"
import { parseSuapFixture, SUAP_FIXTURE_COOKIE } from "@/lib/suap/fixtures"
import { isSuapMock, mockSuapResponse } from "@/lib/suap/mock"

export const suapFetch = async <T>(
  url: string,
  options?: RequestInit,
): Promise<T> => {
  if (isSuapMock()) {
    const fixture = parseSuapFixture(
      (await cookies()).get(SUAP_FIXTURE_COOKIE)?.value,
    )

    // SAFETY: mockSuapResponse returns fixtures shaped like the SUAP responses orval types as T.
    return { ...mockSuapResponse(url, fixture), headers: new Headers() } as T
  }

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

  // SAFETY: orval types T as the { status, data, headers } envelope of this operation; data is the unparsed SUAP JSON body.
  return { status: response.status, data, headers: response.headers } as T
}
