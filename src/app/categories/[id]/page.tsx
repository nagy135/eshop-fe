import Banner from "@/app/components/banner";

interface IParams {
  id: number;
}
export default async function Category({ params }: { params: IParams }) {
  return (
    <>
      <Banner />
      <span className="font-bold">category {params.id}</span>
    </>
  );
}
