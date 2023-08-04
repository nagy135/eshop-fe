"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Login() {
  const { data: session } = useSession();
  const content = session ? (
    <>
      <button onClick={() => signOut()}>
        Sign out <br />
        {session?.user?.name}
      </button>
    </>
  ) : (
    <>
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );

  return (
    <div className="flex flex-row-reverse mx-2 absolute top-0 right-0 text-gray-100">
      <div className="bg-gray-200/75 text-black p-1 rounded text-xs">
        {content}
      </div>
    </div>
  );
}
