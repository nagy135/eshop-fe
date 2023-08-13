import { Item } from "../types";

export const PAGE_SIZE = 5;

export const getItems = async (
  categoryId?: number,
  page: number = 0,
  pageSize: number = PAGE_SIZE,
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
