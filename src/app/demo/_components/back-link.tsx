import { ArrowLeft02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import Link from "next/link"

export function BackLink() {
  return (
    <Link
      href="/"
      className="-mt-2 mb-2 inline-flex h-10 items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors duration-150 ease-out hover:text-foreground"
    >
      <HugeiconsIcon
        strokeWidth={2}
        icon={ArrowLeft02Icon}
        className="size-4"
      />
      Voltar pro início
    </Link>
  )
}
