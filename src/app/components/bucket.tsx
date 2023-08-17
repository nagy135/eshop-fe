"use client";

import { useEffect, useState } from "react";
import { useSyncedUser } from "../contexts/providers";
import { getBucket } from "../queries/get-bucket";
import UserProvider from "../contexts/user";
import { Item } from "../types";

function Inner() {
  const user = useSyncedUser();
  const [bucketItems, setBucketItems] = useState<Item[]>([]);
  useEffect(() => {
    if (user) {
      getBucket(user.id)
        .then((e) => setBucketItems(e))
        .catch((e) => console.log(e));
    }
  }, [user]);
  return (
    <div className="bg-red-50 absolute z-50 p-2 text-2xl rounded left-0 bottom-0">
      <div>{bucketItems.length}</div>
    </div>
  );
}

export default function Bucket() {
  return (
    <UserProvider>
      <Inner />
    </UserProvider>
  );
}
