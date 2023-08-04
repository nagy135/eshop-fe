interface IParams {
  id: number;
}
export default async function Category({ params }: { params: IParams }) {
  return <span className="font-bold">category {params.id}</span>;
}
