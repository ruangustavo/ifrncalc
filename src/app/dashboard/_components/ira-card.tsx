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
    <div className="flex w-fit items-baseline gap-3 rounded-2xl bg-card px-5 py-3 ring-1 ring-foreground/10">
      <span className="flex items-center gap-1 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
        IRA
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              aria-label="O que é o IRA?"
              className="text-muted-foreground/70 transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none"
            >
              <HugeiconsIcon
                strokeWidth={2}
                icon={HelpCircleIcon}
                className="size-3.5"
              />
            </button>
          </TooltipTrigger>
          <TooltipContent className="max-w-56">
            Índice de Rendimento Acadêmico: média geral do seu desempenho no
            curso, de 0 a 100. Quanto maior, melhor.
          </TooltipContent>
        </Tooltip>
      </span>
      <span className="text-3xl leading-none font-extrabold tracking-tight tabular-nums">
        {ira}
      </span>
    </div>
  )
}
