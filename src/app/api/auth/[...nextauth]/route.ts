import { getAccount, updateAccount } from "@/lib/account";
import clientPromise, { MONGO } from "@/lib/mongo";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";

const ROASTER_SCOPE =
  "https://www.googleapis.com/auth/classroom.rosters.readonly";
const COURSES_SCOPE =
  "https://www.googleapis.com/auth/classroom.courses.readonly";

const NEXT_AUTH_OPTIONS: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          scope: `openid email profile ${ROASTER_SCOPE} ${COURSES_SCOPE}`,
          access_type: "offline",
          prompt: "consent",
        },
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, account, profile, session, trigger }: any) => {
      console.log("jwt", { token, user, account, profile, session, trigger });
      console.log(
        "Token Expires at",
        new Date(token.expires_at).toLocaleString()
      );

      if (account) {
        // Save the access token and refresh token in the JWT on the initial login
        return {
          access_token: account.access_token,
          expires_at: account.expires_at * 1000,
          refresh_token: account.refresh_token,
          user: user.id,
        };
      } else if (Date.now() < token.expires_at) {
        // If the access token has not expired yet, return it
        return token;
      } else {
        let refresh_token = token.refresh_token;

        try {
          const response = await fetch("https://oauth2.googleapis.com/token", {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
              client_id: process.env.GOOGLE_CLIENT_ID || "",
              client_secret: process.env.GOOGLE_CLIENT_SECRET || "",
              grant_type: "refresh_token",
              refresh_token,
            }),
            method: "POST",
          });

          const refresh_response = await response.json();

          if (!response.ok) throw refresh_response;

          console.log("Refreshed Token from Google!", {
            refresh_response,
          });

          return {
            ...token,
            access_token: refresh_response.access_token,
            expires_at: Date.now() + refresh_response.expires_in * 1000,
            refresh_token:
              refresh_response.refresh_token || token.refresh_token,
          };
        } catch (error) {
          return { ...token, error: "RefreshAccessTokenError" as const };
        }
      }
    },
    session: ({ session, token, user }: any) => {
      session.accessToken = token.access_token;
      session.error = token.error;

      return session;
    },
  },
};
const handler = NextAuth(NEXT_AUTH_OPTIONS);

export { handler as GET, handler as POST };
