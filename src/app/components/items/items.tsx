import { parseQueryParamNumber } from "@/app/utils";
import { Item, QueryParams } from "../../types";
import ClientItems from "./client-items";

interface IItems {
  categoryId?: number;
  searchParams: QueryParams;
}

const PAGE_SIZE = 5;

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

export default async function Items({ categoryId, searchParams }: IItems) {
  const preloadTilPage = parseQueryParamNumber(searchParams.page);
  const items = await getItems(
    categoryId,
    0,
    preloadTilPage ? (preloadTilPage + 1) * PAGE_SIZE : undefined
  );
  return <ClientItems items={items} categoryId={categoryId} />;
}
