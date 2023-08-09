import { QueryParams } from "./types";

export function throttle<U>(
  cb: (...args: any[]) => U,
  delay: number
): (...args: any[]) => Promise<U | undefined> {
  let wait = false;

  return async (...args: any[]) => {
    if (wait) {
      return;
    }

    wait = true;
    const result = await cb(...args);
    setTimeout(() => {
      wait = false;
    }, delay);
    return result;
  };
}

export function parseQueryParam(
  param: QueryParams[keyof QueryParams]
): string | undefined {
  if (Array.isArray(param)) return param[0];
  return param;
}

export function parseQueryParamNumber(
  param: QueryParams[keyof QueryParams]
): number | undefined {
  if (Array.isArray(param)) return parseInt(param[0]);
  if (!param) return;
  return parseInt(param);
}
