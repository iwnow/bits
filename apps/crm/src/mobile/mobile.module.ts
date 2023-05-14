import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MobileComponent } from './mobile.component';

@NgModule({
  imports: [BrowserModule],
  declarations: [MobileComponent],
  bootstrap: [MobileComponent],
})
export class MobileModule {}
