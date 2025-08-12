import type { RequestErrorContext } from "next/dist/server/instrumentation/types"
import { reportError } from "./lib/discord-webhook"

type onRequestError = (
  error: Error & { digest: string },
  request: Readonly<{
    path: string
    method: string
    headers: NodeJS.Dict<string | string[]>
  }>,
  context: Readonly<RequestErrorContext>,
) => void | Promise<void>

export const onRequestError: onRequestError = async (
  error,
  request,
  context,
) => {
  await reportError({
    message: error.message,
    stack: error.stack,
    digest: error.digest,
    source: "server",
    path: request.path,
    method: request.method,
    headers: Object.fromEntries(
      Object.entries(request.headers).map(([key, value]) => [
        key,
        Array.isArray(value) ? value.join(", ") : value || "",
      ]),
    ),
    context: {
      routerKind: context.routerKind,
      routePath: context.routePath,
      routeType: context.routeType,
      renderSource: context.renderSource,
    },
    timestamp: new Date().toISOString(),
  })
}
