import NextAuth, { NextAuthOptions, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const ROASTER_SCOPE =
  "https://www.googleapis.com/auth/classroom.rosters.readonly";
const COURSES_SCOPE =
  "https://www.googleapis.com/auth/classroom.courses.readonly";

const NEXT_AUTH_OPTIONS: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          scope: `openid email profile ${ROASTER_SCOPE} ${COURSES_SCOPE}`,
        },
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user, account, profile, session, trigger }: any) => {
      if (account) {
        token.accessToken = account.access_token;
        token.id = profile.id;
      }
      return token;
    },
    session: ({ session, token, user }: any) => {
      session.accessToken = token.accessToken;
      session.user.id = token.id;

      return session;
    },
    redirect: ({ baseUrl }: any) => {
      return `${baseUrl}/dashboard`;
    },
  },
};
const handler = NextAuth(NEXT_AUTH_OPTIONS);

export { handler as GET, handler as POST };
