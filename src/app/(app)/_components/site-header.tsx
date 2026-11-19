import { Calculator01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import Link from "next/link"

import { ModeToggle } from "@/components/theme-switcher"
import { siteConfig } from "@/config/site"

import { SignInButton } from "./sign-in-button"

const NAV = [
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#duvidas", label: "Dúvidas" },
] as const

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-extrabold tracking-tight"
        >
          <HugeiconsIcon
            strokeWidth={2}
            icon={Calculator01Icon}
            className="size-5 text-highlight"
          />
          {siteConfig.name}
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <ModeToggle />
          <SignInButton size="sm" />
        </div>
      </div>
    </header>
  )
}
