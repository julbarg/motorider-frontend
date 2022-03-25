import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth, { Session } from 'next-auth'
import Providers from 'next-auth/providers'

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, {
    session: {
      jwt: true,
    },
    jwt: {
      secret: process.env.JWT_SECRET,
    },
    providers: [
      Providers.GitHub({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      }),
    ],

    database: process.env.DATABASE_URL,
    pages: {
      signIn: '/',
    },
    callbacks: {
      async session(session: any, user: any) {
        session.user.id = user.sub
        return session
      },

      async jwt(tokenPayload, user, account, profile, isNewUser) {
        if (tokenPayload && user) {
          return { ...tokenPayload, id: `${user.id}` }
        }

        return tokenPayload
      },
    },
  })
