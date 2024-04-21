import { Observable, firstValueFrom, from, of } from 'rxjs';

export type MaybeAsync<T> = T | Promise<T> | Observable<T>;

export async function maybePromise<T>(data: MaybeAsync<T>): Promise<T> {
  if (data instanceof Promise) {
    return data;
  }
  if (data instanceof Observable) {
    return firstValueFrom(data);
  }
  return data;
}

export function maybeObservable<T>(data: MaybeAsync<T>): Observable<T> {
  if (data instanceof Observable) {
    return data;
  }
  if (data instanceof Promise) {
    return from(data);
  }
  return of(data);
}
