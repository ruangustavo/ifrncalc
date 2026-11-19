import { Trash2 } from "lucide-react"

import { Button, type ButtonProps } from "@/components/ui/button"

export function ClearButton(props: ButtonProps) {
  return (
    <Button size="xs" variant="outline" className={props.className} {...props}>
      <span className="flex items-center gap-1.5">
        <Trash2 className="size-4" />
        Limpar notas editadas
      </span>
    </Button>
  )
}
