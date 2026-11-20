"use client"

import { HelpCircleIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function IraCard({ ira }: { ira: string }) {
  return (
    <p className="flex items-center gap-1 text-sm text-muted-foreground">
      IRA
      <span className="font-semibold text-foreground tabular-nums">{ira}</span>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            aria-label="O que é o IRA?"
            className="text-muted-foreground/70 transition-colors duration-150 hover:text-foreground focus-visible:text-foreground focus-visible:outline-none"
          >
            <HugeiconsIcon
              strokeWidth={2}
              icon={HelpCircleIcon}
              className="size-3.5"
            />
          </button>
        </TooltipTrigger>
        <TooltipContent className="max-w-56">
          Índice de Rendimento Acadêmico: a média geral do seu curso, de 0 a
          100.
        </TooltipContent>
      </Tooltip>
    </p>
  )
}
