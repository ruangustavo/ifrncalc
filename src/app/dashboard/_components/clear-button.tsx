import { Delete02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import type { ComponentProps } from "react"

import { Button } from "@/components/ui/button"

export function ClearButton(props: ComponentProps<typeof Button>) {
  return (
    <Button size="sm" variant="outline" {...props}>
      <HugeiconsIcon strokeWidth={2} icon={Delete02Icon} />
      Limpar notas simuladas
    </Button>
  )
}
