const CUT = {
  stroke: "black",
  strokeWidth: 3.6,
  strokeLinecap: "round",
  fill: "none",
} as const

export function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={className}>
      <mask id="brand-mark-cuts">
        <rect width={64} height={64} fill="white" />
        <path d="M11.5 17.5h12M17.5 11.5v12" {...CUT} />
        <path d="M40.5 17.5h12" {...CUT} />
        <path d="M13.3 42.3l8.4 8.4M21.7 42.3l-8.4 8.4" {...CUT} />
        <path d="M41 43.5h11M41 49.5h11" {...CUT} />
      </mask>
      <g mask="url(#brand-mark-cuts)">
        <rect x={5} y={5} width={25} height={25} rx={6} fill="currentColor" />
        <rect x={34} y={5} width={25} height={25} rx={6} fill="currentColor" />
        <rect x={5} y={34} width={25} height={25} rx={6} fill="currentColor" />
        <circle cx={46.5} cy={46.5} r={12.5} className="fill-coral" />
      </g>
    </svg>
  )
}
