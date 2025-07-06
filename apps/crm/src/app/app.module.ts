import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { provideCrmConfig, provideItemsLoaders } from 'crm-core';
import { AppComponent } from './app.component';
import { appBaseRoutes } from './app.routes';
import env from './env';
import { registerLocaleData } from '@angular/common';
import ru from '@angular/common/locales/ru';

registerLocaleData(ru, 'ru-RU');
@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appBaseRoutes, {
      initialNavigation: 'enabledBlocking',
    }),
  ],
  providers: [
    provideCrmConfig({
      apiBaseUrl: env.BIT_API_PREFIX,
      eventLog: false,
    }),
    provideHttpClient(withInterceptorsFromDi()),
    provideItemsLoaders(),
    {
      provide: LOCALE_ID,
      useValue: 'ru-RU',
    },
    { provide: DEFAULT_CURRENCY_CODE, useValue: '₽' },
  ],
})
export class AppModule {}
