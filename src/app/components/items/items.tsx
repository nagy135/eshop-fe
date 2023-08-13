import { parseQueryParamNumber } from "@/app/utils";
import { QueryParams } from "../../types";
import ClientItems from "./client-items";
import { PAGE_SIZE, getItems } from "@/app/queries/get-items";

interface IItems {
  categoryId?: number;
  searchParams: QueryParams;
}

export default async function Items({ categoryId, searchParams }: IItems) {
  const preloadTilPage = parseQueryParamNumber(searchParams.page);
  const items = await getItems(
    categoryId,
    0,
    preloadTilPage ? (preloadTilPage + 1) * PAGE_SIZE : undefined
  );
  return <ClientItems items={items} categoryId={categoryId} />;
}
