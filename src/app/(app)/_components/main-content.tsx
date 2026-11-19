import { Faq } from "./faq"
import { FinalCta } from "./final-cta"
import { Hero } from "./hero"
import { HowItWorks } from "./how-it-works"
import { Privacy } from "./privacy"
import { SiteFooter } from "./site-footer"
import { SiteHeader } from "./site-header"
import { Stats } from "./stats"
import { Story } from "./story"

export function MainContent() {
  return (
    <div className="min-h-dvh bg-background">
      <SiteHeader />
      <main>
        <Hero />
        <Stats />
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
