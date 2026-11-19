import { cn } from "@/lib/utils"

const LEVELS = [
  { label: "até 40", hint: "tranquilo", dot: "bg-success" },
  { label: "41 a 90", hint: "atenção", dot: "bg-warning" },
  { label: "acima de 90", hint: "difícil", dot: "bg-danger" },
] as const

export function GradeLegend() {
  return (
    <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1 pt-1 text-xs text-muted-foreground">
      {LEVELS.map((level) => (
        <li key={level.label} className="flex items-center gap-1.5">
          <span className={cn("size-2 rounded-full", level.dot)} />
          <span>
            <span className="font-medium text-foreground">{level.label}</span>{" "}
            {level.hint}
          </span>
        </li>
      ))}
    </ul>
  )
}
