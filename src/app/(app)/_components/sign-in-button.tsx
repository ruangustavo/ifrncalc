"use client"

import { ArrowRight02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { signIn } from "next-auth/react"

import { Button } from "@/components/ui/button"

interface SignInButtonProps {
  size?: "sm" | "xl"
  variant?: "default" | "chrome"
  className?: string
}

export function SignInButton({
  size = "xl",
  variant = "default",
  className,
}: SignInButtonProps) {
  return (
    <Button
      size={size}
      variant={variant}
      className={className}
      onClick={() => signIn("suap")}
    >
      {size === "xl" ? "Conectar com SUAP" : "Entrar"}
      <HugeiconsIcon strokeWidth={2} icon={ArrowRight02Icon} />
    </Button>
  )
}
