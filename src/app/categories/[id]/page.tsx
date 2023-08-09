import Items from "@/app/components/items/items";
import { QueryParams } from "@/app/types";

interface IPage {
  params: {
    id: number;
  };
  searchParams: QueryParams;
}
export default async function Category({ params, searchParams }: IPage) {
  return (
    <>
      <Items categoryId={params.id ?? 1} searchParams={searchParams} />
    </>
  );
}
