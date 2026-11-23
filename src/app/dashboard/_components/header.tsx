import Link from "next/link"

import { BrandMark } from "@/app/(app)/_components/brand-mark"
import { SignInButton } from "@/app/(app)/_components/sign-in-button"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

import { InstallGuide } from "./install/install-guide"
import { MobileTabBar } from "./mobile-tab-bar"
import { NavLink } from "./nav-link"
import { UserMenu } from "./user-menu"

type Viewer = "member" | "guest" | "pending"

export function Header({ viewer = "member" }: { viewer?: Viewer }) {
  return (
    <>
      <header className="sticky top-0 z-50 bleed-safe-top bg-chrome text-chrome-foreground">
        <div className="mx-auto flex h-14 max-w-7xl items-stretch gap-2 px-4 sm:px-6 md:grid md:grid-cols-3 lg:h-16 lg:px-8">
          <Link
            href="/"
            aria-label={siteConfig.name}
            className="flex items-center gap-2 text-lg font-bold tracking-tight"
          >
            <BrandMark className="size-5" dotClassName="fill-grade-hard" />
            <span className={cn(viewer === "member" && "max-md:hidden")}>
              {siteConfig.name}
            </span>
          </Link>

          {viewer === "member" && (
            <>
              <nav
                aria-label="Principal"
                className="flex items-stretch max-md:hidden md:justify-self-center"
              >
                <NavLink href="/dashboard">Boletim</NavLink>
                <NavLink href="/calculadora">Calculadora</NavLink>
              </nav>
              <div className="ml-auto flex items-center md:col-start-3 md:justify-self-end">
                <UserMenu />
              </div>
            </>
          )}

          {viewer === "guest" && (
            <div className="ml-auto flex items-center md:col-start-3 md:justify-self-end">
              <SignInButton size="sm" variant="chrome" />
            </div>
          )}
        </div>
      </header>
      {viewer === "member" && (
        <>
          <MobileTabBar />
          <InstallGuide />
        </>
      )}
    </>
  )
}
