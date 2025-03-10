"use client";

import { useSession } from "next-auth/react";

export default function LoggedInClient() {
  const { data: session } = useSession();

  return (
    <div
      className={`p-4 basis-2/4 rounded-sm text-center ${
        session ? "bg-green-400" : "bg-red-400"
      }`}>
      Client:{" "}
      {session ? `logged in as ${session.user?.name}.` : "not logged in."}
    </div>
  );
}
