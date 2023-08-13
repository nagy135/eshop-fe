import Link from "next/link";
import { getConfiguration } from "../queries/get-configuration";

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
