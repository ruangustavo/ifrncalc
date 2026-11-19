import { Faq } from "./faq"
import { FinalCta } from "./final-cta"
import { Hero } from "./hero"
import { HowItWorks } from "./how-it-works"
import { Privacy } from "./privacy"
import { SiteFooter } from "./site-footer"
import { SiteHeader } from "./site-header"
import { Story } from "./story"

export function MainContent() {
  return (
    <div className="min-h-dvh">
      <SiteHeader />
      <main>
        <Hero />
        <Story />
        <HowItWorks />
        <Privacy />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  )
}
