import { ArrowRight02Icon, Tick02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

export function Verdict() {
  return (
    <span className="font-medium">
      Precisa de <span className="text-primary">50</span> no 3º e 4º Bim{" "}
      <HugeiconsIcon
        strokeWidth={2}
        icon={ArrowRight02Icon}
        className="inline size-4"
      />{" "}
      média{" "}
      <span className="text-success-emphasis">
        60{" "}
        <HugeiconsIcon
          strokeWidth={2}
          icon={Tick02Icon}
          className="inline size-4"
        />
      </span>
    </span>
  )
}
