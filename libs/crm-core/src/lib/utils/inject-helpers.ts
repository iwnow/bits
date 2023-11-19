import { DestroyRef, ElementRef, inject } from '@angular/core';
import { Subject } from 'rxjs';

export function useElementRef() {
  return inject(ElementRef).nativeElement as HTMLElement;
}

export function useDestroyStream() {
  const destroy$ = new Subject<void>();
  inject(DestroyRef).onDestroy(() => {
    destroy$.next();
    destroy$.complete();
  });
  return destroy$;
}