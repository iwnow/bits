export function arrayFill(count: number) {
  return Array(count)
    .fill(0)
    .map((_, i) => ++i);
}
