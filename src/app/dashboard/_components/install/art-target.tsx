import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

export function ArtTarget({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        "flex items-center gap-1.5 rounded-lg bg-card font-semibold text-primary ring-2 ring-primary",
        className,
      )}
    >
      {children}
    </span>
  )
}
