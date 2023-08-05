import Image from "next/image";
import { Configuration } from "../types";
import Link from "next/link";

const getConfiguration = async (): Promise<Configuration> => {
  return (
    await fetch("http://api:8000/configuration", { cache: "no-cache" })
  ).json();
};

export default async function Banner() {
  const configuration = await getConfiguration();
  const bannerUrl = `http://api:8000/${configuration.banner}`;
  return (
    <div className="relative max-h-64">
      <Link className="h-full" href={`/`}>
        <Image
          src={bannerUrl}
          width={500}
          height={500}
          className="w-full object-cover max-h-64 md:max-h-52"
          alt="Banner"
        />
        <div className="absolute bottom-3 right-3 text-2xl font-bold text-gray-200">
          {configuration.title}
        </div>
      </Link>
    </div>
  );
}
