import { Injectable, Type, inject } from '@angular/core';

export enum LayoutType {
  mobile = 'mobile',
  desktop = 'desktop',
}

let currentLayout: LayoutType = LayoutType.desktop;
detectLayout();

@Injectable({ providedIn: 'root' })
export class LayoutService {
  constructor() {
    this.detect();
  }

  get current(): LayoutType {
    return currentLayout;
  }

  get isMobile() {
    return this.current === LayoutType.mobile;
  }

  get isDesktop() {
    return this.current === LayoutType.desktop;
  }

  detect() {
    detectLayout();
  }
}

function detectLayout() {
  if (
    /Android|iPhone/i.test(window.navigator.userAgent) ||
    window.innerWidth < 680
  ) {
    currentLayout = LayoutType.mobile;
  } else {
    currentLayout = LayoutType.desktop;
  }
}

export function loadChildrenByLayout(opt: LoadChildrenByLayoutOpt) {
  if (currentLayout === LayoutType.mobile) {
    return opt.mobile;
  }
  return opt.desktop;
}

export type LoadChildrenByLayoutOpt = {
  desktop: () => Promise<Type<unknown>>;
  mobile: () => Promise<Type<unknown>>;
};
