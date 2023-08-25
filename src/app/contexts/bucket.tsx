import { FC, ReactNode, createContext, useState } from "react";
import { Item } from "../types";

interface IBucketContext {
  bucketOpen: boolean;
  setBucketOpen: React.Dispatch<React.SetStateAction<boolean>>;
  items: Item[] | null;
  setItems: React.Dispatch<React.SetStateAction<Item[] | null>>;
}

export const BucketContext = createContext<IBucketContext | undefined>(
  undefined
);

const BucketProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<IBucketContext["items"]>(null);
  const [bucketOpen, setBucketOpen] =
    useState<IBucketContext["bucketOpen"]>(false);

  return (
    <BucketContext.Provider
      value={{ items, setItems, bucketOpen, setBucketOpen }}
    >
      {children}
    </BucketContext.Provider>
  );
};

export default BucketProvider;
