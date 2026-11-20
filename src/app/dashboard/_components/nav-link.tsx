"use client"

import Link, { type LinkProps } from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

interface NavLinkProps extends LinkProps {
  className?: string
  children: React.ReactNode
}

export function NavLink({ className, children, ...props }: NavLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === props.href

  return (
    <Link
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "relative flex items-center px-3 text-sm font-semibold text-chrome-foreground/65 transition-colors duration-150 after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:rounded-full after:bg-chrome-foreground after:opacity-0 after:transition-opacity after:duration-150 hover:text-chrome-foreground aria-[current=page]:text-chrome-foreground aria-[current=page]:after:opacity-100",
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  )
}
