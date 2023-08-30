import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { provideCrmConfig } from '@bits/crm-core';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import env from './env';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
  ],
  bootstrap: [AppComponent],
  providers: [
    provideCrmConfig({
      apiBaseUrl: env.BIT_API_PREFIX,
    }),
  ],
})
export class AppModule {}
