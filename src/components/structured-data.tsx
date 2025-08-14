import { siteConfig } from '@/config/site'

interface StructuredDataProps {
  data?: object
}

export function StructuredData({ data }: StructuredDataProps) {
  const defaultData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": siteConfig.name,
    "description": siteConfig.description,
    "url": siteConfig.url,
    "author": {
      "@type": "Person",
      "name": siteConfig.author.name,
      "url": siteConfig.author.url
    },
    "publisher": {
      "@type": "Person",
      "name": siteConfig.author.name,
      "url": siteConfig.author.url
    },
    "inLanguage": "pt-BR",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${siteConfig.url}/calculadora`
      },
      "query-input": "required name=search_term_string"
    },
    "sameAs": [
      siteConfig.author.url
    ],
    "about": {
      "@type": "EducationalOrganization",
      "name": "Instituto Federal do Rio Grande do Norte",
      "alternateName": "IFRN",
      "url": "https://portal.ifrn.edu.br/"
    }
  }

  const structuredData = data || defaultData

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2)
      }}
    />
  )
}
