import { MAX_WEIGHT, MIN_WEIGHT } from "./discipline"

const STEP =
  "flex size-8 items-center justify-center rounded-full text-base leading-none transition duration-150 ease-out outline-none hover:bg-foreground/10 focus-visible:ring-2 focus-visible:ring-foreground/60 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-30"

interface WeightStepperProps {
  index: number
  weight: number
  onChange: (index: number, weight: number) => void
}

export function WeightStepper({ index, weight, onChange }: WeightStepperProps) {
  return (
    <div className="mt-1 flex items-center justify-between rounded-full bg-muted p-0.5 text-xs font-medium">
      <button
        type="button"
        aria-label={`Diminuir peso da nota ${index + 1}`}
        disabled={weight <= MIN_WEIGHT}
        onClick={() => onChange(index, weight - 1)}
        className={STEP}
      >
        −
      </button>
      <span className="px-1 whitespace-nowrap tabular-nums">peso {weight}</span>
      <button
        type="button"
        aria-label={`Aumentar peso da nota ${index + 1}`}
        disabled={weight >= MAX_WEIGHT}
        onClick={() => onChange(index, weight + 1)}
        className={STEP}
      >
        +
      </button>
    </div>
  )
}
