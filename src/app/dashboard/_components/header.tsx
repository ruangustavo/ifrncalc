import Link from "next/link"

import { BrandMark } from "@/app/(app)/_components/brand-mark"
import { SignInButton } from "@/app/(app)/_components/sign-in-button"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

import { NavLink } from "./nav-link"
import { SignOutButton } from "./sign-out-button"

type Viewer = "member" | "guest" | "pending"

export function Header({ viewer = "member" }: { viewer?: Viewer }) {
  return (
    <header className="sticky top-0 z-50 border-b border-chrome-foreground/10 bg-chrome text-chrome-foreground">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:h-16 lg:px-8">
        <Link
          href="/"
          aria-label={siteConfig.name}
          className="flex items-center gap-2 text-lg font-bold tracking-tight"
        >
          <BrandMark className="size-5" dotClassName="fill-grade-hard" />
          <span className={cn(viewer === "member" && "max-sm:hidden")}>
            {siteConfig.name}
          </span>
        </Link>

        {viewer === "member" && (
          <nav className="flex items-center gap-1">
            <NavLink href="/dashboard">Boletim</NavLink>
            <NavLink href="/calculadora">Calculadora</NavLink>
            <SignOutButton />
          </nav>
        )}

        {viewer === "guest" && (
          <div className="flex items-center gap-1">
            <SignInButton size="sm" variant="chrome" />
          </div>
        )}
      </div>
    </header>
  )
}
