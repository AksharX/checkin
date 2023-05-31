"use client";

import { useSession } from "next-auth/react";

export function ProfilePic() {
  const { data } = useSession();
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="w-8 h-8 rounded-full"
      src={data?.user?.image || ""}
      alt="user photo"
    />
  );
}
