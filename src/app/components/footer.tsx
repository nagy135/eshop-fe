import { Configuration } from "../types";

const getConfiguration = async (): Promise<Configuration> => {
  return (
    await fetch("http://api:8000/configuration", { cache: "no-cache" })
  ).json();
};

export default async function Footer() {
  const configuration = await getConfiguration();
  return (
    <div className="w-full fixed bottom-0 px-3 flex flex-row justify-between">
      <div>{configuration.title}</div>
      <div>™Viktor</div>
    </div>
  );
}
