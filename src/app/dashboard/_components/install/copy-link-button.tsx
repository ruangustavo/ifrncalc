"use client"

import { Copy01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"

export function CopyLinkButton({ browser }: { browser: string }) {
  return (
    <Button
      variant="outline"
      onClick={async () => {
        await navigator.clipboard.writeText(siteConfig.url)
        toast.success(`Link copiado. Cola no ${browser}.`)
      }}
    >
      <HugeiconsIcon
        data-icon="inline-start"
        strokeWidth={2}
        icon={Copy01Icon}
      />
      Copiar link
    </Button>
  )
}
