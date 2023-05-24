import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { AppBarModule } from './app-bar/app-bar.module';

@NgModule({
  imports: [
    CommonModule,
    AppBarModule,
    RouterModule.forChild([
      {
        path: '',
        component: LayoutComponent
      }
    ])
  ],
  declarations: [LayoutComponent]
})
export class LayoutModule { }
