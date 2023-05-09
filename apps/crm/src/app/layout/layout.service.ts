import { Injectable, inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LayoutService {
  constructor() {
    this.detect();
  }

  #current: LayoutType = LayoutType.desktop;

  get current(): LayoutType {
    return this.#current;
  }

  detect() {
    if (
      /Android|iPhone/i.test(window.navigator.userAgent) ||
      window.innerWidth < 680
    ) {
      this.#current = LayoutType.mobile;
    } else {
      this.#current = LayoutType.desktop;
    }
  }
}

export enum LayoutType {
  mobile = 'mobile',
  desktop = 'desktop',
}
