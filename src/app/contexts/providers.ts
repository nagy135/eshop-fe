import { useContext, useEffect } from "react";
import { UserContext } from "./user";
import { useSession } from "next-auth/react";
import { useOrCreateUser } from "../queries/get-or-create-user";

export function useUserContext() {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUserContext must be within UserProvider");
  }

  return context;
}

export function useSyncedUser() {
  const { data: session } = useSession();
  const { user, setUser } = useUserContext();

  useEffect(() => {
    if (!session?.user?.email) return;

    console.log("calling with", session.user.email);
    useOrCreateUser(session.user.email).then((user) => setUser(user));
  }, [session]);

  return user;
}
