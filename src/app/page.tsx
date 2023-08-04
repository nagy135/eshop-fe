import Banner from "./components/banner";
import Categories from "./components/categories/categories";
import Login from "./components/login";

export default function Home() {
  return (
    <>
      <Login />
      <Banner />
      <Categories />
      <div className="container ml-4">Welcome</div>
    </>
  );
}
