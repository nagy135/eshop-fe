export const addItemToBucket = async (
  itemId: number,
  userId: number
): Promise<number> => {
  // TODO: use zod to verify here

  const result = await (
    await fetch("http://localhost:8000/add_to_bucket", {
      cache: "no-cache",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        itemId,
        userId,
      }),
    })
  ).json();

  return result.id;
};
