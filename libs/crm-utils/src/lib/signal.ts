import { inject, Injector, Signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';

export function useObservable<T>(signal: Signal<T>) {
  return toObservable(signal, { injector: inject(Injector) });
}
