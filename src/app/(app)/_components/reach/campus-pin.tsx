import { cn } from "@/lib/utils"

const DELAYS = [
  "delay-0",
  "delay-75",
  "delay-100",
  "delay-150",
  "delay-200",
  "delay-300",
] as const

interface CampusPinProps {
  x: number
  y: number
  order: number
  onEnter: () => void
  onLeave: () => void
}

export function CampusPin({ x, y, order, onEnter, onLeave }: CampusPinProps) {
  return (
    <g
      transform={`translate(${x} ${y})`}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
    >
      <g
        className={cn(
          "transition-[translate,opacity] duration-500 ease-snap in-data-[pins=waiting]:-translate-y-3 in-data-[pins=waiting]:opacity-0 in-data-[pins=waiting]:transition-none motion-reduce:translate-y-0 motion-reduce:transition-none",
          DELAYS[order % DELAYS.length],
        )}
      >
        <circle cy={-18} r={24} className="fill-transparent" />
        <path
          d="M0 0C-5-11-13-18-13-27a13 13 0 1 1 26 0C13-18 5-11 0 0Z"
          className="fill-coral stroke-ink [stroke-width:2.5px]"
        />
        <circle cy={-27} r={4.5} className="fill-ink" />
      </g>
    </g>
  )
}
