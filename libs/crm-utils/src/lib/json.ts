export function jsonTryStringify(
  o: any,
  replacer?: (this: any, key: string, value: any) => any,
  space?: string | number
) {
  try {
    return JSON.stringify(o, replacer, space);
  } catch (error) {
    console.error(error);
  }
  return undefined;
}

export function jsonTryParse<T>(
  json: string,
  reviver?: (this: any, key: string, value: any) => any
): T {
  try {
    return JSON.parse(json, reviver) as any as T;
  } catch (error) {
    console.error(error);
  }
  return undefined as T;
}
