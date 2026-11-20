"use client"

import { ArrowUp01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
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

const EASE_GLIDE = [0.77, 0, 0.175, 1] as const
const EASE_SNAP = [0.23, 1, 0.32, 1] as const

export function MobileTabBar() {
  const pathname = usePathname()
  const reduceMotion = useReducedMotion()
  const [collapsed, setCollapsed] = useScrollCollapsed()
  const [pending, setPending] = useState<TabHref | null>(null)

  const current =
    pending ?? TABS.find(({ href }) => href === pathname)?.href ?? "/dashboard"

  const active = TABS.find(({ href }) => href === current) ?? TABS[0]
  const morph = { duration: reduceMotion ? 0 : 0.26, ease: EASE_GLIDE }
  const fade = { duration: 0.15, ease: EASE_SNAP }

  return (
    <motion.nav
      layout
      transition={morph}
      aria-label="Principal"
      data-tab-bar
      initial={false}
      animate={{ borderRadius: 999 }}
      className="fixed inset-x-0 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-40 mx-auto w-fit bg-foreground p-1 md:hidden"
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {collapsed ? (
          <motion.button
            key="collapsed"
            layout="position"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={fade}
            type="button"
            aria-label={`${active.label}. Mostrar navegação`}
            onClick={() => setCollapsed(false)}
            className="flex h-11 items-center gap-1.5 rounded-full bg-background px-4 text-sm font-semibold text-foreground transition-transform duration-150 ease-snap active:scale-[0.97]"
          >
            {active.label}
            <HugeiconsIcon
              strokeWidth={2}
              icon={ArrowUp01Icon}
              className="size-4 shrink-0 opacity-70"
            />
          </motion.button>
        ) : (
          <motion.div
            key="expanded"
            layout="position"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={fade}
            className="relative grid grid-cols-2"
          >
            <span
              aria-hidden
              className={cn(
                "absolute inset-y-0 left-0 w-1/2 rounded-full bg-background transition-transform duration-250 ease-glide motion-reduce:transition-none",
                current === "/calculadora" && "translate-x-full",
              )}
            />
            {TABS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                aria-current={current === href ? "page" : undefined}
                onClick={() => setPending(href)}
                className="relative flex h-11 items-center justify-center px-5 text-sm font-semibold text-background/70 transition duration-150 ease-snap active:scale-[0.97] aria-[current=page]:text-foreground"
              >
                {label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
