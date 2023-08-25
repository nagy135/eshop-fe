import { User } from "../types";

export const useOrCreateUser = async (email: string): Promise<any> => {
  // TODO: use zod to verify here

  const result = await (
    await fetch("http://localhost:8000/get_or_create_user", {
      cache: "no-cache",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    })
  ).json();

  return result;
};
