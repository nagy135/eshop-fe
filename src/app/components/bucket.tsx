"use client";

import { useEffect } from "react";
import { useBucketContext, useSyncedUser } from "../contexts/providers";
import { getBucket } from "../queries/get-bucket";
import UserProvider from "../contexts/user";
import BucketProvider from "../contexts/bucket";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../queries/enums";

function Inner() {
  const user = useSyncedUser();
  const { setItems: setBucketItems } = useBucketContext();

  const { data: items } = useQuery({
    queryKey: [QueryKeys.BUCKET],
    queryFn: () => (user ? getBucket(user?.id) : []),
    enabled: !!user,
  });

  useEffect(() => {
    items && setBucketItems(items);
  }, [items]);

  return (
    <div className="fixed bg-red-50 z-50 p-2 w-10 text-center drop-shadow-xl shadow-black text-2xl rounded left-2 top-2 hover:bg-gray-400 hover:text-white cursor-pointer">
      <div className={items ? "" : "animate-spin"}>
        {items ? items.length : "⎈"}
      </div>
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
