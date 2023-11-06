export function logRet<T1>(a: T1): T1;
export function logRet<T1, T2, T3, T4, T5, T6>(
  a1: T1,
  a2?: T2,
  a3?: T3,
  a4?: T4,
  a5?: T5,
  a6?: T6,
  ...args: any[]
) {
  // eslint-disable-next-line prefer-rest-params
  console.log(...arguments);
  return arguments.length === 1 ? a1 : args;
}
