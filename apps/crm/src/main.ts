import { Type } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { layout } from './layout';

(async () => {
  try {
    let bootstrapModule: Type<unknown>;

    if (layout.isDesktop) {
      bootstrapModule = await import('./app/app.module').then(
        (m) => m.AppModule
      );
    } else {
      bootstrapModule = await import('crm/mobile').then(
        (m) => m.MobileAppModule
      );
    }

    await platformBrowserDynamic().bootstrapModule(bootstrapModule);
  } catch (err) {
    console.error(err);
  }
})();
