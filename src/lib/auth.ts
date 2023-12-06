import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 2 * 60 * 60, // 2 hours
    updateAge: 0,
  },
  callbacks: {
    async session({ session, token, user }) {
      session.user.id = token.sub;
      session.accessToken = token.accessToken;

      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (account) {
        token.accessToken = account.access_token;
      }

      return token;
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
      userinfo: `${process.env.SUAP_URL}/api/eu/`,
      profile(profile) {
        return {
          id: profile.identificacao,
          email: profile.email,
        };
      },
    },
  ],
};
