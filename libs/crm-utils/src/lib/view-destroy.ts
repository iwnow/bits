import { DestroyRef, inject } from '@angular/core';
import { Subject } from 'rxjs';

export function viewDestroy() {
  const destroy$ = new Subject<void>();
  inject(DestroyRef).onDestroy(() => {
    destroy$.next();
    destroy$.complete();
  });
  return destroy$.asObservable();
}
