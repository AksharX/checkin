"use client";
import { useAuth } from "@/components/hooks/useAuth";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export function GoogleLogin() {
  const { status } = useAuth();
  const router = useRouter();
  if (status === "authenticated") {
    return (
      <React.Fragment>
        <p>
          Your already logged in!{" "}
          <Link
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            href={"/dashboard"}
          >
            Go to dashboard
          </Link>{" "}
          or{" "}
          <button
            onClick={() => signOut()}
            type="submit"
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            Logout
          </button>
        </p>
      </React.Fragment>
    );
  }

  return (
    <button
      onClick={() => signIn("google")}
      type="submit"
      className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
    >
      Sign in via Google
    </button>
  );
}
