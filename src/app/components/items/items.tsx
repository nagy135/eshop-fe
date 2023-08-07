import { Item } from "../../types";
import ClientItems from "./client-items";

interface IItems {
  categoryId?: number;
}

export const getItems = async (
  categoryId?: number,
  page: number = 0,
  pageSize: number = 5,
  client: boolean = false
): Promise<Item[]> => {
  var url = new URL(`http://${client ? "localhost" : "api"}:8000/items`);

  if (categoryId) url.searchParams.append("categoryId", categoryId.toString());
  url.searchParams.append("page", page.toString());
  url.searchParams.append("pageSize", pageSize.toString());
  const res = await fetch(url, {
    cache: "no-cache",
  });

  return res.body ? res.json() : [];
};

export default async function Items({ categoryId }: IItems) {
  const items = await getItems(categoryId);
  return <ClientItems items={items} categoryId={categoryId} />;
}
