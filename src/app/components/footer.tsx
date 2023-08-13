import { getConfiguration } from "../queries/get-configuration";

export default async function Footer() {
  const configuration = await getConfiguration();
  return (
    <div className="w-full fixed bottom-0 px-3 flex flex-row justify-between">
      <div>{configuration.title}</div>
      <div>™Viktor</div>
    </div>
  );
}
