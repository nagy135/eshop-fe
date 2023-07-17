import Categories from "./components/categories/categories";
import Login from "./components/login";

export default function Home() {
  return (
    <>
      <Login />
      <Categories />
      <div className="container ml-4">Welcome</div>
    </>
  );
}
