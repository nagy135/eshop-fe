import Image from "next/image";

import { Item } from "../types";

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
  return (
    <div className="container grid grid-cols-1 sm:grid-cols-3 gap-16 sm:gap-4 sm:gap-y-8 sm:mx-auto px-4">
      {items.map((item, i) => (
        <div key={`item-${i}`} className="p-3 drop-shadow-2xl h-64 group">
          {item.image__image.length ? (
            <div className="object-contain">
              <Image
                src={`http://api:8000/media/${item.image__image[0]}`}
                width={300}
                height={300}
                className="w-full object-cover rounded h-64 group-hover:scale-105 transition duration-200"
                alt="Banner"
              />
            </div>
          ) : null}
          <div className="absolute bottom-0 right-0 font-bold bg-white drop-shadow-xl text-black p-2 rounded ">
            {item.name}
          </div>
          <div className="absolute top-0 left-0 font-bold bg-black/75 text-white p-1 rounded text-lg hover:scale-110">
            {item.price}€
          </div>
        </div>
      ))}
    </div>
  );
}
