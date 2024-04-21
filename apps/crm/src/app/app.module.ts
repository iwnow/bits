import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { provideCrmConfig } from 'crm-core';
import { AppComponent } from './app.component';
import { appBaseRoutes } from './app.routes';
import env from './env';
import { MessagesModule } from 'primeng/messages';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(appBaseRoutes, {
      initialNavigation: 'enabledBlocking',
    }),
  ],
  bootstrap: [AppComponent],
  providers: [
    provideCrmConfig({
      apiBaseUrl: env.BIT_API_PREFIX,
    }),
  ],
})
export class AppModule {}
