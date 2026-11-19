import { ArrowRight, Check } from "lucide-react"

export function Verdict() {
  return (
    <span className="font-medium">
      Precisa de <span className="text-primary">50</span> no 3º e 4º Bim{" "}
      <ArrowRight className="inline size-4" /> média{" "}
      <span className="text-success-emphasis">
        60 <Check className="inline size-4" />
      </span>
    </span>
  )
}
