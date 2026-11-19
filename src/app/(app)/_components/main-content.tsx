import { cn } from "@/lib/utils"

import { displayFont } from "./display-font"
import { Faq } from "./faq"
import { FinalCta } from "./final-cta/final-cta"
import { handFont } from "./hand-font"
import { Hero } from "./hero/hero"
import { HowItWorks } from "./how-it-works"
import { Privacy } from "./privacy"
import { Reach } from "./reach/reach"
import { SiteFooter } from "./site-footer"
import { SiteHeader } from "./site-header"
import { Story } from "./story"
import { Tiers } from "./tiers"

export function MainContent() {
  return (
    <div
      className={cn(
        "dark landing min-h-dvh bg-forest text-cream",
        displayFont.variable,
        handFont.variable,
      )}
    >
      <a
        href="#conteudo"
        className="sr-only rounded-md bg-cream px-3 py-2 text-sm font-medium text-ink focus-visible:not-sr-only focus-visible:fixed focus-visible:top-3 focus-visible:left-3 focus-visible:z-60"
      >
        Pular para o conteúdo
      </a>
      <SiteHeader />
      <main id="conteudo">
        <Hero />
        <Tiers />
        <Reach />
        <HowItWorks />
        <Privacy />
        <Story />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  )
}
