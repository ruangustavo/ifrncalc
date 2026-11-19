import { Calculator01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import Link from "next/link"

import { siteConfig } from "@/config/site"

import { SignInButton } from "./sign-in-button"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-transparent bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold tracking-tight"
        >
          <HugeiconsIcon
            strokeWidth={2}
            icon={Calculator01Icon}
            className="size-5 text-primary"
          />
          {siteConfig.name}
        </Link>
        <SignInButton size="sm" />
      </div>
    </header>
  )
}
