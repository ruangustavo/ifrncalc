'use client'

import { SessionProvider } from 'next-auth/react'
import { SWRConfig } from 'swr'
import { ThemeProvider } from '@/components/theme-provider'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <SWRConfig
        value={{
          fetcher: (url: string) => fetch(url).then((res) => res.json()),
        }}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </SWRConfig>
    </SessionProvider>
  )
}
