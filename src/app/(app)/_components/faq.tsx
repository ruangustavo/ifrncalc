import { ArrowDown01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { StructuredData } from "@/components/structured-data"

import { FAQ_ITEMS } from "./faq-items"

const FAQ_STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
}

export function Faq() {
  return (
    <section id="duvidas" className="scroll-mt-16 border-t">
      <div className="mx-auto max-w-3xl px-4 py-20 md:py-28">
        <StructuredData data={FAQ_STRUCTURED_DATA} />
        <h2 className="text-4xl leading-none font-extrabold tracking-tighter text-balance md:text-5xl">
          Perguntas que a gente{" "}
          <span className="text-highlight">sempre ouve.</span>
        </h2>
        <div className="mt-8 divide-y border-y">
          {FAQ_ITEMS.map((item) => (
            <details key={item.question} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left text-lg font-semibold [&::-webkit-details-marker]:hidden">
                {item.question}
                <HugeiconsIcon
                  strokeWidth={2}
                  icon={ArrowDown01Icon}
                  className="size-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
                />
              </summary>
              <p className="pb-5 text-muted-foreground">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
