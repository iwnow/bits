import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';

import { AppBarComponent } from './app-bar.component';

@NgModule({
  imports: [
    CommonModule,
    ToolbarModule,
    ButtonModule
  ],
  declarations: [AppBarComponent],
  exports: [AppBarComponent],
})
export class AppBarModule { }
