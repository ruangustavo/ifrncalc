"use client"

import { CircleHelp } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function IraCard({ ira }: { ira: string }) {
  return (
    <div className="flex w-fit items-baseline gap-2.5 rounded-xl border bg-card px-4 py-2.5">
      <span className="flex items-center gap-1 text-muted-foreground text-sm">
        IRA
        <Tooltip>
          <TooltipTrigger
            type="button"
            aria-label="O que é o IRA?"
            className="text-muted-foreground/70 transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none"
          >
            <CircleHelp className="size-3.5" />
          </TooltipTrigger>
          <TooltipContent className="max-w-56">
            Índice de Rendimento Acadêmico: média geral do seu desempenho no
            curso, de 0 a 100. Quanto maior, melhor.
          </TooltipContent>
        </Tooltip>
      </span>
      <span className="font-semibold text-xl tabular-nums">{ira}</span>
    </div>
  )
}
