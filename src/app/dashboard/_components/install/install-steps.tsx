import type { ReactNode } from "react"

export interface InstallStep {
  text: ReactNode
  art: ReactNode
}

export function InstallSteps({ steps }: { steps: InstallStep[] }) {
  return (
    <ol className="grid">
      {steps.map((step, index) => (
        <li
          key={index}
          className="relative grid grid-cols-[1.25rem_1fr] gap-3 pb-5 last:pb-0"
        >
          {index < steps.length - 1 && (
            <span
              aria-hidden
              className="absolute top-6 bottom-1 left-2.5 w-px -translate-x-1/2 bg-border"
            />
          )}
          <span className="flex size-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground tabular-nums">
            {index + 1}
          </span>
          <div className="grid gap-2">
            <p className="text-sm text-pretty">{step.text}</p>
            {step.art}
          </div>
        </li>
      ))}
    </ol>
  )
}
