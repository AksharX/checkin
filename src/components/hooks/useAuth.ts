import { Session } from "next-auth";
import { signIn, signOut, useSession } from "next-auth/react";

export interface UseAuthResult {
  data: (Session & { accessToken?: string }) | null;
  status: "authenticated" | "unauthenticated" | "loading";
}

export function useAuth(): UseAuthResult {
  const { data, status }: any = useSession();

  return {
    data,
    status,
  };
}
