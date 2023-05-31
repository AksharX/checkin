import { getAccount } from "@/lib/account";
import clientPromise from "@/lib/mongo";
import NextAuth, { NextAuthOptions } from "next-auth";
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
    jwt: async ({ token, user, account, profile, session, trigger }: any) => {
      if (account) {
        // Save the access token and refresh token in the JWT on the initial login
        return {
          access_token: account.access_token,
          expires_at: Math.floor(Date.now() / 1000 + account.expires_in),
          refresh_token: account.refresh_token,
        };
      } else if (Date.now() < token.expires_at * 1000) {
        // If the access token has not expired yet, return it
        return token;
      } else {
        const a = await getAccount(user.id, "google");
        if (!a) {
          return { ...token, error: "RefreshAccessTokenError" as const };
        }

        console.log("refreshing token", a.refresh_token);
        // If the access token has expired, try to refresh it
        try {
          // https://accounts.google.com/.well-known/openid-configuration
          // We need the `token_endpoint`.
          const response = await fetch("https://oauth2.googleapis.com/token", {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
              client_id: process.env.GOOGLE_CLIENT_ID || "",
              client_secret: process.env.GOOGLE_CLIENT_SECRET || "",
              grant_type: "refresh_token",
              refresh_token: a.refresh_token,
            }),
            method: "POST",
          });

          console.log("response", response);
          const tokens = await response.json();
          console.log("response token", tokens);

          if (!response.ok) throw tokens;

          return {
            ...token, // Keep the previous token properties
            access_token: tokens.access_token,
            expires_at: Math.floor(Date.now() / 1000 + tokens.expires_in),
            // Fall back to old refresh token, but note that
            // many providers may only allow using a refresh token once.
            refresh_token: tokens.refresh_token || token.refresh_token,
          };
        } catch (error) {
          console.error("Error refreshing access token", error);
          // The error property will be used client-side to handle the refresh token error
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
