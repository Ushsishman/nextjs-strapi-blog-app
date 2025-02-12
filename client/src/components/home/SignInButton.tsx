"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import useCallbackUrl from "@/hooks/useCallbackUrl";

const SignInButton = () => {
  const { data: session } = useSession();
  const callbackUrl = useCallbackUrl();

  if (session && session.user) {
    return (
      <div className="flex gap-4 ml-auto">
        <p className="text-sky-600">{session.user.name}</p>
        <button onClick={() => signOut()} className="text-red-600">
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <Link
      href={`/signin?callbackUrl=${callbackUrl}`}
      className="bg-sky-400 rounded-md px-4 py-2">
      sign in
    </Link>
  );
};

export default SignInButton;
