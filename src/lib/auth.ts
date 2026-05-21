import type { NextAuthOptions } from "next-auth"
import { notifyError } from "@/lib/notify"

interface Profile {
  identificacao: string
  nome_social: string
  nome_usual: string
  nome_registro: string
  nome: string
  primeiro_nome: string
  ultimo_nome: string
  email: string
  email_secundario: string
  email_google_classroom: string
  email_academico: string
  campus: string
  foto: string
  tipo_usuario: string
  email_preferencial: string
}

const NOISY_OAUTH_CALLBACK_PATTERNS = [
  "state mismatch",
  "state cookie was missing",
  "state value could not be parsed",
  "pkce code_verifier cookie was missing",
  "pkce code_verifier value could not be parsed",
  "nonce cookie was missing",
  "nonce value could not be parsed",
]

function isNoisyAuthError(code: string, message: string): boolean {
  if (code !== "OAUTH_CALLBACK_ERROR") return false
  const m = message.toLowerCase()
  return NOISY_OAUTH_CALLBACK_PATTERNS.some((p) => m.includes(p))
}

export const authOptions: NextAuthOptions = {
  logger: {
    error(code, metadata) {
      const error = metadata instanceof Error ? metadata : metadata.error
      if (isNoisyAuthError(code, error.message)) return
      notifyError(`auth.ts / next-auth (${code})`, {
        code,
        message: error.message,
      })
    },
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub
      session.accessToken = token.accessToken as string
      return session
    },
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token
      }

      return token
    },
  },
  providers: [
    {
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      id: "suap",
      name: "SUAP",
      type: "oauth",
      authorization: {
        url: `${process.env.SUAP_URL}/o/authorize`,
        params: { scope: "email identificacao" },
      },
      token: `${process.env.SUAP_URL}/o/token/`,
      userinfo: `${process.env.SUAP_URL}/api/rh/eu/`,
      profile(profile: Profile) {
        return {
          id: profile.identificacao,
          name: profile.nome_registro
            .split(" ")
            .slice(0, 2)
            .map(
              (word) =>
                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
            )
            .join(" "),
          email: profile.email_preferencial,
          role: profile.tipo_usuario,
          image: profile.foto,
        }
      },
    },
  ],
}
