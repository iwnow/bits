export function arrayFill(count: number) {
  return Array(count)
    .fill(0)
    .map((_, i) => ++i);
}

export function createArray(len: number, fill?: (index: number) => any) {
  const arr = new Array(len);
  for (let index = 0; index < arr.length; index++) {
    arr[index] = typeof fill === 'function' ? fill(index) : index;
  }
  return arr;
}

export function distinctArray<T>(arr: T[], key?: (item: T) => any) {
  const result: T[] = [];
  const distinct = new Set<any>();
  for (const item of arr) {
    const keyVal = key ? key(item) : item;
    if (!distinct.has(keyVal)) {
      distinct.add(keyVal);
      result.push(item);
    }
  }
  return result;
}
