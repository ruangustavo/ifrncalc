"use client"

import { ArrowDown01Icon, Logout03Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { signOut, useSession } from "next-auth/react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { InstallMenuItem } from "./install/install-menu-item"

function initialsOf(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("")
}

export function UserMenu() {
  const { data: session } = useSession()
  const name = session?.user?.name ?? ""
  const enrollment = session?.user?.id

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost-chrome"
          aria-label={name ? `Conta de ${name}` : "Conta"}
          // oxlint-disable-next-line shadcn/no-restyle -- the account chip wraps a round avatar, so its hover shape follows it
          className="rounded-full pl-1"
        >
          <span className="flex size-7 items-center justify-center rounded-full bg-chrome-foreground text-xs font-bold text-chrome">
            {initialsOf(name)}
          </span>
          <span>{name.split(" ")[0]}</span>
          <HugeiconsIcon
            strokeWidth={2}
            icon={ArrowDown01Icon}
            className="opacity-70"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={8} className="w-60">
        <DropdownMenuLabel>
          <span className="block text-sm font-semibold text-foreground">
            {name}
          </span>
          {enrollment && (
            <span className="mt-0.5 block text-xs font-normal text-muted-foreground tabular-nums">
              Matrícula {enrollment}
            </span>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <InstallMenuItem />
        <DropdownMenuItem variant="destructive" onSelect={() => signOut()}>
          <HugeiconsIcon strokeWidth={2} icon={Logout03Icon} />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
