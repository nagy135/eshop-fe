"use client";

import { useEffect } from "react";
import { useBucketContext, useSyncedUser } from "../contexts/providers";
import { getBucket } from "../queries/get-bucket";
import UserProvider from "../contexts/user";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../queries/enums";
import { BsFillBasket2Fill } from "react-icons/bs";

function Inner() {
  const user = useSyncedUser();
  const { setItems: setBucketItems, setBucketOpen } = useBucketContext();

  const { data: items } = useQuery({
    queryKey: [QueryKeys.BUCKET],
    queryFn: () => (user ? getBucket(user?.id) : []),
    enabled: !!user,
  });

  const handleClick = () => {
    setBucketOpen(true);
  };

  useEffect(() => {
    items && setBucketItems(items);
  }, [items]);

  return (
    <div
      onClick={handleClick}
      className="fixed bg-red-50 z-50 p-2 text-center border border-gray-400 drop-shadow-xl shadow-black text-2xl rounded left-2 top-2 hover:bg-gray-400 hover:text-white cursor-pointer"
    >
      <div className={items ? "" : "animate-spin"}>
        {items ? (
          <div className="flex">
            <span className="flex-1 flex flex-row items-center mr-2">
              <BsFillBasket2Fill />
            </span>
            <span>{items.length}</span>
          </div>
        ) : (
          "⎈"
        )}
      </div>
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
