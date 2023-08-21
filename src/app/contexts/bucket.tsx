import { FC, ReactNode, createContext, useState } from "react";
import { Item } from "../types";

interface IBucketContext {
  items: Item[] | null;
  setItems: React.Dispatch<React.SetStateAction<Item[] | null>>;
}

export const BucketContext = createContext<IBucketContext | undefined>(
  undefined
);

const BucketProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<IBucketContext["items"]>(null);

  return (
    <BucketContext.Provider value={{ items, setItems }}>
      {children}
    </BucketContext.Provider>
  );
};

export default BucketProvider;
