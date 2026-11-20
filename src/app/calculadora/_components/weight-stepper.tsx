import { type FocusEvent, type KeyboardEvent, useRef, useState } from "react"

import { cn } from "@/lib/utils"

import { MAX_WEIGHT, MIN_WEIGHT } from "./discipline"

const STEP =
  "flex size-8 items-center justify-center rounded-full text-sm leading-none text-muted-foreground transition duration-150 ease-snap outline-none hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-foreground/60 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-30 motion-reduce:transform-none"

interface WeightStepperProps {
  index: number
  weight: number
  onChange: (index: number, weight: number) => void
}

export function WeightStepper({ index, weight, onChange }: WeightStepperProps) {
  const [open, setOpen] = useState(false)
  const groupRef = useRef<HTMLDivElement>(null)
  const centerRef = useRef<HTMLButtonElement>(null)

  const dismiss = {
    onBlur: (event: FocusEvent) => {
      if (!groupRef.current?.contains(event.relatedTarget)) setOpen(false)
    },
    onKeyDown: (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    },
  }

  const step = (next: number) => {
    if (next <= MIN_WEIGHT || next >= MAX_WEIGHT) centerRef.current?.focus()

    onChange(index, next)
  }

  return (
    <div ref={groupRef} className="mt-1 flex items-center justify-between">
      <button
        {...dismiss}
        type="button"
        aria-label={`Diminuir peso da nota ${index + 1}`}
        disabled={!open || weight <= MIN_WEIGHT}
        onClick={() => step(weight - 1)}
        className={cn(STEP, !open && "invisible scale-90 opacity-0")}
      >
        −
      </button>
      <button
        {...dismiss}
        ref={centerRef}
        type="button"
        aria-expanded={open}
        aria-label={`Peso da nota ${index + 1}: ${weight}. ${open ? "Fechar" : "Alterar"}`}
        onClick={() => setOpen((previous) => !previous)}
        className={cn(
          "rounded-full px-2.5 py-1.5 text-xs font-medium whitespace-nowrap tabular-nums transition-colors duration-150 ease-out outline-none focus-visible:ring-2 focus-visible:ring-foreground/60",
          open
            ? "bg-muted text-foreground"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        peso {weight}
      </button>
      <button
        {...dismiss}
        type="button"
        aria-label={`Aumentar peso da nota ${index + 1}`}
        disabled={!open || weight >= MAX_WEIGHT}
        onClick={() => step(weight + 1)}
        className={cn(STEP, !open && "invisible scale-90 opacity-0")}
      >
        +
      </button>
    </div>
  )
}
