import { Faq } from "./faq"
import { FinalCta } from "./final-cta/final-cta"
import { Hero } from "./hero/hero"
import { Reach } from "./reach/reach"
import { SiteFooter } from "./site-footer"
import { SiteHeader } from "./site-header"
import { Story } from "./story"
import { Tiers } from "./tiers"

export function MainContent() {
  return (
    <div className="landing min-h-dvh bg-forest text-cream">
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
        <Faq />
        <Story />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  )
}
