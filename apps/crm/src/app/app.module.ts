import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { provideCrmConfig, provideItemsLoaders } from 'crm-core';
import { AppComponent } from './app.component';
import { appBaseRoutes } from './app.routes';
import env from './env';

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
  ],
})
export class AppModule {}
