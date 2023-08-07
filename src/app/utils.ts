export function throttle<U>(
  cb: (...args: any[]) => U,
  delay: number
): (...args: any[]) => Promise<U | undefined> {
  let wait = false;

  return async (...args: any[]) => {
    if (wait) {
      console.log("================\n", "WAITING", "\n================");
      return;
    }

    console.log("================\n", "FINE", "\n================");
    wait = true;
    const result = await cb(...args);
    setTimeout(() => {
      wait = false;
    }, delay);
    return result;
  };
}
