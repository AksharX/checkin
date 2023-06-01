import { Session } from "next-auth";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

export interface UseAuthResult {
  data: (Session & { accessToken?: string; error: string }) | null;
  status: "authenticated" | "unauthenticated" | "loading";
}

export function useAuth(): UseAuthResult {
  const { data, status }: any = useSession();

  useEffect(() => {
    if (data && data.error) {
      signIn("google", { callbackUrl: "/dashboard" });
    }
  }, [data]);

  return {
    data,
    status,
  };
}
