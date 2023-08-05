import Items from "@/app/components/items/items";

interface IParams {
  id: number;
}
export default async function Category({ params }: { params: IParams }) {
  return (
    <>
      <Items categoryId={params.id ?? 1} />
    </>
  );
}
