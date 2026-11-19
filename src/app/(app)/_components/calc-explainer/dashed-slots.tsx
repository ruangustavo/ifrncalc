import { cn } from "@/lib/utils"

import type { GroupProps } from "./bimester"

const SLOT_DELAYS = ["delay-0", "delay-80", "delay-160"]

export function DashedSlots({ b, step }: GroupProps) {
  const filled = step >= b.at

  return (
    <div className="absolute inset-0 flex gap-1">
      {Array.from({ length: b.weight }, (_, k) => (
        <div
          key={`${b.label}-slot-${k}`}
          className={cn(
            "flex-1 rounded-md border-2 border-dashed transition-colors duration-300",
            filled
              ? ["border-transparent", SLOT_DELAYS[k]]
              : "border-highlight/30 delay-0",
          )}
        />
      ))}
    </div>
  )
}
