import { tap } from 'rxjs';

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
