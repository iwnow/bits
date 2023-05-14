import { Type } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { layout } from './layout';

(async () => {
  try {
    let bootstrapModule: Type<unknown>;

    if (layout.isDesktop) {
      bootstrapModule = await import('./desktop/desktop.module').then(
        (m) => m.DesktopModule
      );
    } else {
      bootstrapModule = await import('./mobile/mobile.module').then(
        (m) => m.MobileModule
      );
    }

    await platformBrowserDynamic().bootstrapModule(bootstrapModule);
  } catch (err) {
    console.error(err);
  }
})();
