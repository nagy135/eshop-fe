"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  const content = session ? (
    <>
      Signed in as {session?.user?.email} <br />
      <button onClick={() => signOut()}>Sign out</button>
    </>
  ) : (
    <>
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );

  return (
    <div className="flex flex-row-reverse mx-2 absolute top-0 right-0 text-gray-100">
      <div className="">{content}</div>
    </div>
  );
}
