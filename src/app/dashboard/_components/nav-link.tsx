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
        "rounded-full px-3 py-1.5 text-sm font-medium text-chrome-foreground/70 transition-colors duration-150 hover:text-chrome-foreground",
        isActive && "bg-chrome-foreground/10 text-chrome-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  )
}
