import ClientCategories from "./client-categories";
import { Categories } from "./types";
import "rsuite/dist/rsuite.min.css";

const getCategories = async (): Promise<Categories> => {
  return (
    await fetch("http://api:8000/categories", { cache: "no-cache" })
  ).json();
};

export default async function Categories() {
  const categories = await getCategories();

  return <ClientCategories key="client-categories" categories={categories} />;
}
