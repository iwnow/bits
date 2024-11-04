export type Extendable<T> = T & {
  [key: string]: any;
};

export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

// eslint-disable-next-line @typescript-eslint/ban-types
export interface Type<T> extends Function {
  new (...args: any[]): T;
}

export function ket<T>(type: Type<T>, key: keyof T) {
  return key as string;
}
