import { PlusSignIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import Link from "next/link"

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
    <section id="duvidas" className="scroll-mt-14 bg-sun text-ink">
      <StructuredData data={FAQ_STRUCTURED_DATA} />
      <div className="mx-auto grid max-w-7xl gap-x-12 gap-y-10 px-4 py-20 sm:px-6 lg:grid-cols-12 lg:px-8 lg:py-28">
        <div className="lg:col-span-4">
          <h2 className="font-display text-[clamp(2.5rem,10vw,3.5rem)] leading-[0.95] font-extrabold tracking-[-0.035em] text-balance lg:text-[clamp(3rem,4.2vw,4rem)]">
            Perguntas frequentes
          </h2>
        </div>

        <div className="divide-y divide-ink/20 lg:col-span-7 lg:col-start-6">
          {FAQ_ITEMS.map((item) => (
            <details
              key={item.question}
              className="group [interpolate-size:allow-keywords] details-content:h-0 details-content:overflow-clip details-content:opacity-0 details-content:transition-[height,opacity,content-visibility] details-content:transition-discrete details-content:duration-200 details-content:ease-snap open:details-content:h-auto open:details-content:opacity-100 motion-reduce:details-content:transition-[opacity,content-visibility]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left font-display text-lg font-semibold outline-none focus-visible:underline sm:text-xl [&::-webkit-details-marker]:hidden">
                {item.question}
                <HugeiconsIcon
                  strokeWidth={2}
                  icon={PlusSignIcon}
                  className="size-5 shrink-0 text-ink/60 transition-transform duration-200 ease-snap group-open:rotate-45"
                />
              </summary>
              <p className="max-w-2xl pb-6 text-pretty text-ink/75">
                {item.answer}
                {"link" in item && (
                  <>
                    {" "}
                    <Link
                      href={item.link.href}
                      className="font-semibold text-ink underline underline-offset-4"
                    >
                      {item.link.label}
                    </Link>
                  </>
                )}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
