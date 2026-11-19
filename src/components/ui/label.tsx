"use client"

import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { Label as LabelPrimitive } from "radix-ui"
import * as React from "react"

const labelVariants = cva(
  "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
  {
    variants: {
      size: {
        default: "",
        lg: "text-base",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
)

function Label({
  className,
  size,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root> &
  VariantProps<typeof labelVariants>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(labelVariants({ size }), className)}
      {...props}
    />
  )
}

export { Label }
