import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Profile {
    id: string
    email: string
  }

  interface User {
    campus?: string
    userType?: string
  }

  interface Session {
    accessToken?: string
    user: {
      id: string | undefined
      campus?: string
      userType?: string
    } & DefaultSession['user']
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string
    campus?: string
    userType?: string
  }
}
