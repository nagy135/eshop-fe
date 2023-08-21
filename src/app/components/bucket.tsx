"use client";

import { useEffect } from "react";
import { useBucketContext, useSyncedUser } from "../contexts/providers";
import { getBucket } from "../queries/get-bucket";
import UserProvider from "../contexts/user";
import BucketProvider from "../contexts/bucket";

function Inner() {
  const user = useSyncedUser();
  const { items, setItems } = useBucketContext();

  useEffect(() => {
    if (user) {
      getBucket(user.id)
        .then((e) => setItems(e))
        .catch((e) => console.log(e));
    }
  }, [user]);
  return (
    <div className="bg-red-50 absolute z-50 p-2 w-10 text-center text-2xl rounded left-2 bottom-2 hover:bg-red-500 hover:text-yellow-400 cursor-pointer">
      <div>{items ? items.length : 0}</div>
    </div>
  );
}

export default function Bucket() {
  return (
    <UserProvider>
      <BucketProvider>
        <Inner />
      </BucketProvider>
    </UserProvider>
  );
}
