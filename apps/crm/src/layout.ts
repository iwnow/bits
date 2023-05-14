import { Injectable, Provider, Type, inject } from '@angular/core';

export enum LayoutType {
  mobile = 'mobile',
  desktop = 'desktop',
}

@Injectable()
export class LayoutService {
  constructor() {
    this.detect();
  }

  #currentLayout: LayoutType = LayoutType.desktop;

  get current(): LayoutType {
    return this.#currentLayout;
  }

  get isMobile() {
    return this.current === LayoutType.mobile;
  }

  get isDesktop() {
    return this.current === LayoutType.desktop;
  }

  detect() {
    if (
      /Android|iPhone/i.test(window.navigator.userAgent) ||
      window.innerWidth < 680
    ) {
        this.#currentLayout = LayoutType.mobile;
    } else {
        this.#currentLayout = LayoutType.desktop;
    }
  }
}

export const layout = new LayoutService();

export const LayoutProvider: Provider = {
    provide: LayoutService,
    useFactory: () => layout,
}
