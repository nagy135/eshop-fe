import { Item } from "../types";

export const getBucket = async (userId: number): Promise<Item[]> => {
  // TODO: use zod to verify here

  const result = await (
    await fetch("http://localhost:8000/get_bucket", {
      cache: "no-cache",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
      }),
    })
  ).json();

  return result;
};
