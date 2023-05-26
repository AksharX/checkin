"use client";
import { Session } from "next-auth";
import { SessionProvider, signIn, useSession } from "next-auth/react";

interface HomeComponentProps {
  session: Session | null;
}

export function HomeComponentContainer({ session }: HomeComponentProps) {
  return (
    <SessionProvider session={session}>
      <HomeComponent />
    </SessionProvider>
  );
}

export function HomeComponent() {
  const { data, status } = useSession();

  return (
    <main>
      <h1>Home</h1>
      <section>
        <h2>Status</h2>
        <p>{status}</p>

        <h2>Session</h2>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </section>
      <button onClick={() => signIn("google")}>Google Login</button>
    </main>
  );
}
