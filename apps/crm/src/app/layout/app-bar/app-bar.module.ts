import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarModule } from 'primeng/toolbar';

import { AppBarComponent } from './app-bar.component';

@NgModule({
  imports: [
    CommonModule,
    ToolbarModule
  ],
  declarations: [AppBarComponent],
  exports: [AppBarComponent],
})
export class AppBarModule { }
