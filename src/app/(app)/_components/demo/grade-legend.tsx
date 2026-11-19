const LEVELS = [
  { label: "até 40", hint: "tranquilo", color: "bg-green-500" },
  { label: "41 a 90", hint: "atenção", color: "bg-yellow-500" },
  { label: "acima de 90", hint: "difícil", color: "bg-red-500" },
] as const

export function GradeLegend() {
  return (
    <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1 pt-1 text-xs text-muted-foreground">
      {LEVELS.map((level) => (
        <li key={level.label} className="flex items-center gap-1.5">
          <span className={`size-2 rounded-full ${level.color}`} />
          <span>
            <span className="font-medium text-foreground">{level.label}</span>{" "}
            {level.hint}
          </span>
        </li>
      ))}
    </ul>
  )
}
