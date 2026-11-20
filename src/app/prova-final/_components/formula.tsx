import { renderToString } from "katex"

export function Formula({ tex }: { tex: string }) {
  return (
    <span
      className="block overflow-x-auto py-2 text-lg"
      dangerouslySetInnerHTML={{
        __html: renderToString(tex, {
          output: "mathml",
          displayMode: true,
          throwOnError: true,
        }),
      }}
    />
  )
}
