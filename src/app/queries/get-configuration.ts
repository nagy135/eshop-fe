import { Configuration } from "../types";

export const getConfiguration = async (): Promise<Configuration> => {
  return (
    await fetch("http://api:8000/configuration", { cache: "no-cache" })
  ).json();
};
