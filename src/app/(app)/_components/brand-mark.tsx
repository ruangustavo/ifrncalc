const DOTS = [
  { cx: 3, cy: 21 },
  { cx: 3, cy: 12 },
  { cx: 12, cy: 21 },
  { cx: 12, cy: 12 },
  { cx: 12, cy: 3 },
  { cx: 21, cy: 21 },
] as const

export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      {DOTS.map((dot) => (
        <circle key={`${dot.cx}-${dot.cy}`} cx={dot.cx} cy={dot.cy} r={3} />
      ))}
    </svg>
  )
}
