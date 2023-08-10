import { Configuration } from "../types";
import Link from "next/link";

const getConfiguration = async (): Promise<Configuration> => {
  return (
    await fetch("http://api:8000/configuration", { cache: "no-cache" })
  ).json();
};

export default async function Banner() {
  const configuration = await getConfiguration();
  const bannerUrl = `http://localhost:8000/${configuration.banner}`;
  return (
    <Link className="h-full" href={`/`}>
      <div
        className="relative h-64 bg-fixed bg-top bg-no-repeat"
        style={{
          backgroundImage: `url("${bannerUrl}")`,
          backgroundSize: "100% auto",
        }}
      >
        <div className="absolute bottom-3 right-3 text-2xl font-bold text-gray-200">
          {configuration.title}
        </div>
      </div>
    </Link>
  );
}
