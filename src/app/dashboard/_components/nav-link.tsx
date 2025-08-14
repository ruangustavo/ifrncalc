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
      className={cn(
        "font-semibold text-muted-foreground text-sm transition-colors hover:text-primary",
        isActive && "text-primary",
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  )
}
