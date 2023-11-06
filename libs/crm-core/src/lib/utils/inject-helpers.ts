import { ElementRef, inject } from '@angular/core';

export function useElementRef() {
  return inject(ElementRef).nativeElement as HTMLElement;
}
