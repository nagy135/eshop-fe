import { Item } from "../../types";
import ClientItems from "./client-items";

interface IItems {
  categoryId?: number;
}

const getItems = async (categoryId?: number): Promise<Item[]> => {
  return (
    await fetch(
      `http://api:8000/items${categoryId ? "?categoryId=" + categoryId : ""}`,
      {
        cache: "no-cache",
      }
    )
  ).json();
};

export default async function Items({ categoryId }: IItems) {
  const items = await getItems(categoryId);
  return <ClientItems items={items} />;
}
