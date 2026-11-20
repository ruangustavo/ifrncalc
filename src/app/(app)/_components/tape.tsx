import { cn } from "@/lib/utils"

export function Tape({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "absolute h-8 w-28 bg-sun/80 shadow-[0_1px_2px_rgb(0_0_0/0.25)] [clip-path:polygon(0_0,4%_18%,0_36%,4%_54%,0_72%,4%_90%,0_100%,100%_100%,96%_82%,100%_64%,96%_46%,100%_28%,96%_10%,100%_0)]",
        className,
      )}
    />
  )
}
