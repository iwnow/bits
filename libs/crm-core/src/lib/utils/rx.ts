import { filter, map, pipe, tap } from 'rxjs';

export function rxDebug<T>(
  opt?: Partial<{
    prefix: string;
  }>
) {
  return tap<T>((e) => {
    const log: any[] = [e];
    if (opt?.prefix) {
      log.unshift(opt.prefix);
    }
    console.log(...log);
  });
}

export type NonNullable<T> = Exclude<T, null | undefined>;

export function whenTrue<T>() {
  return pipe(
    filter<T>((e) => !!e),
    map((i) => i as NonNullable<T>)
  );
}
