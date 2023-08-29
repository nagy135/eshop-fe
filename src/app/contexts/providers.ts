import { useContext, useEffect } from "react";
import { UserContext } from "./user";
import { useSession } from "next-auth/react";
import { useOrCreateUser } from "../queries/get-or-create-user";
import { BucketContext } from "./bucket";

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

    useOrCreateUser(session.user.email).then((user) => {
      setUser(user);
    });
  }, [session]);

  return user;
}

export function useBucketContext() {
  const context = useContext(BucketContext);

  if (context === undefined) {
    throw new Error("useBucketContext must be within BucketProvider");
  }

  return context;
}
