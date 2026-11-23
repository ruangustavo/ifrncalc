"use client"

import { ArrowUp01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { motion, useReducedMotion } from "motion/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

import { cn } from "@/lib/utils"

import { useScrollCollapsed } from "./use-scroll-collapsed"

const TABS = [
  { href: "/dashboard", label: "Boletim" },
  { href: "/calculadora", label: "Calculadora" },
] as const

type TabHref = (typeof TABS)[number]["href"]

const TAB_CLASS =
  "relative flex h-11 items-center px-5 text-sm font-semibold whitespace-nowrap text-background/70 transition duration-150 ease-snap active:scale-[0.97] aria-[current=page]:text-foreground"

export function MobileTabBar() {
  const pathname = usePathname()
  const reduceMotion = useReducedMotion()
  const [collapsed, setCollapsed] = useScrollCollapsed()
  const [pending, setPending] = useState<TabHref | null>(null)

  const current =
    pending ?? TABS.find(({ href }) => href === pathname)?.href ?? "/dashboard"

  const fold = reduceMotion
    ? { duration: 0 }
    : { type: "spring" as const, visualDuration: 0.26, bounce: 0.18 }

  return (
    <motion.nav
      layoutScroll
      aria-label="Principal"
      data-tab-bar
      className="fixed inset-x-0 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-40 mx-auto flex w-fit rounded-full bg-foreground p-1 md:hidden"
    >
      {TABS.map(({ href, label }) => {
        const isActive = href === current
        const folded = collapsed && !isActive
        const expandable = collapsed && isActive

        const content = (
          <>
            {isActive && (
              <motion.span
                layoutId="tab-bar-indicator"
                transition={fold}
                initial={false}
                animate={{ borderRadius: 999 }}
                className="absolute inset-0 bg-background"
              />
            )}
            <span className="relative">{label}</span>
            <motion.span
              initial={false}
              animate={{
                width: expandable ? "auto" : 0,
                opacity: expandable ? 1 : 0,
              }}
              transition={fold}
              className="relative flex overflow-hidden"
            >
              <span className="pl-1.5">
                <HugeiconsIcon
                  strokeWidth={2}
                  icon={ArrowUp01Icon}
                  className="size-4 shrink-0 opacity-70"
                />
              </span>
            </motion.span>
          </>
        )

        return (
          <motion.div
            key={href}
            initial={false}
            animate={{ width: folded ? 0 : "auto", opacity: folded ? 0 : 1 }}
            transition={fold}
            aria-hidden={folded || undefined}
            className={cn(!isActive && "overflow-hidden")}
          >
            {expandable ? (
              <button
                type="button"
                aria-current="page"
                aria-label={`${label}. Mostrar navegação`}
                onClick={() => setCollapsed(false)}
                className={TAB_CLASS}
              >
                {content}
              </button>
            ) : (
              <Link
                href={href}
                tabIndex={folded ? -1 : undefined}
                aria-current={isActive ? "page" : undefined}
                onClick={() => setPending(href)}
                className={TAB_CLASS}
              >
                {content}
              </Link>
            )}
          </motion.div>
        )
      })}
    </motion.nav>
  )
}
