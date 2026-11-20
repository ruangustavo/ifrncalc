import { cn } from "@/lib/utils"

import { DISCIPLINE_TYPES, type DisciplineType } from "./discipline"

interface TypeToggleProps {
  value: DisciplineType
  onChange: (type: DisciplineType) => void
}

export function TypeToggle({ value, onChange }: TypeToggleProps) {
  return (
    <fieldset className="relative grid grid-cols-2 rounded-full bg-muted p-1">
      <legend className="sr-only">Tipo de disciplina</legend>
      <span
        aria-hidden
        className={cn(
          "absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-card shadow-sm ring-1 ring-foreground/5 transition-transform duration-200 ease-glide motion-reduce:transition-none",
          value === "semester" && "translate-x-full",
        )}
      />
      {DISCIPLINE_TYPES.map((type) => (
        <label
          key={type.value}
          className="relative cursor-pointer rounded-full px-3.5 py-2.5 text-center text-sm font-semibold whitespace-nowrap text-muted-foreground transition-colors duration-200 ease-out has-checked:text-foreground has-focus-visible:ring-3 has-focus-visible:ring-ring/50 sm:px-5"
        >
          <input
            type="radio"
            name="discipline-type"
            value={type.value}
            checked={value === type.value}
            onChange={() => onChange(type.value)}
            className="sr-only"
          />
          {type.label}
        </label>
      ))}
    </fieldset>
  )
}
