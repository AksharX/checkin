import { getSession } from "next-auth/react";
import "./globals.css";
import { Inter } from "next/font/google";
import React from "react";
import AuthContext from "@/components/contexts/authContexts";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Checkin",
  description: "Checkin for students",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactElement;
}) {
  const session = await getSession();
  return (
    <html lang="en" className="dark">
      <head>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.css"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        <AuthContext session={session}>{children}</AuthContext>
      </body>
    </html>
  );
}
