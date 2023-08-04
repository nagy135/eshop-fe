import Image from "next/image";

const getConfiguration = async (): Promise<any> => {
  return (
    await fetch("http://api:8000/configuration", { cache: "no-cache" })
  ).json();
};

export default async function Banner() {
  const configuration = await getConfiguration();
  const bannerUrl = `http://api:8000${configuration.banner}`;
  return (
    <>
      <Image
        src={bannerUrl}
        width={500}
        height={500}
        className="w-full max-h-64 object-cover"
        alt="Picture of the author"
      />
    </>
  );
}
