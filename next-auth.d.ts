import NextAuth, { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Profile {
    id: string
    email: string
  }

  interface Session {
    accessToken: string
    user: {
      id: string | undefined
    } & DefaultSession['user']
  }
}
