"use client";

import { useEffect } from "react";
import { useBucketContext, useSyncedUser } from "../contexts/providers";
import { getBucket } from "../queries/get-bucket";
import UserProvider from "../contexts/user";
import BucketProvider from "../contexts/bucket";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Item } from "../types";
import { QueryKeys } from "../queries/enums";

function Inner() {
  const user = useSyncedUser();
  // const { items: bucketItems, setItems: setBucketItems } = useBucketContext();

  const { data: items } = useQuery({
    queryKey: [QueryKeys.BUCKET],
    queryFn: () => (user ? getBucket(user?.id) : []),
    enabled: !!user,
  });

  // useEffect(() => {
  //   if (user) {
  //     getBucket(user.id)
  //       .then((e) => setItems(e))
  //       .catch((e) => console.log(e));
  //   }
  // }, [user]);
  return (
    <div className="bg-red-50 absolute z-50 p-2 w-10 text-center text-2xl rounded left-2 bottom-2 hover:bg-red-500 hover:text-yellow-400 cursor-pointer">
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
