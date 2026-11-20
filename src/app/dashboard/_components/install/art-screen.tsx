import type { ReactNode } from "react"

export function ArtScreen({ children }: { children: ReactNode }) {
  return (
    <div
      aria-hidden
      className="flex h-24 flex-col justify-center gap-1.5 overflow-hidden rounded-xl bg-muted px-3 text-xs select-none"
    >
      {children}
    </div>
  )
}
