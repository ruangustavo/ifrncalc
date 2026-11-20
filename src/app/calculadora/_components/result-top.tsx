import { cn } from "@/lib/utils"

import type { CalcResult } from "./calc-result"
import { describeResult } from "./describe-result"

export function ResultTop({ result }: { result: CalcResult }) {
  const view = describeResult(result)

  return (
    <>
      <h1 className="text-sm font-medium text-muted-foreground">
        Calculadora de média
      </h1>
      <div
        aria-live="polite"
        className={cn(
          "@container mt-3 rounded-3xl p-5 transition-colors duration-200 ease-out sm:p-6",
          view.surface,
        )}
      >
        <div className="flex min-h-26 flex-col gap-4 @xs:flex-row @xs:items-end @xs:justify-between @xs:gap-6">
          <div>
            <p className="text-xs font-semibold tracking-wide uppercase">
              {view.label}
            </p>
            <p className="mt-2 text-7xl leading-none font-extrabold tracking-tighter tabular-nums">
              {view.number}
            </p>
          </div>
          <div className="@xs:max-w-44 @xs:text-right">
            <p className="text-lg leading-tight font-bold text-balance">
              {view.title}
            </p>
            <p className="mt-1 text-sm text-pretty opacity-75">{view.detail}</p>
          </div>
        </div>
      </div>
    </>
  )
}
