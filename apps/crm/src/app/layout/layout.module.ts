import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { AppBarModule } from './app-bar/app-bar.module';
import { LayoutComponent } from './layout.component';
import { LeftBarComponent } from './left-bar/left-bar.component';

@NgModule({
  imports: [
    CommonModule,
    AppBarModule,
    RouterModule.forChild([
      {
        path: '',
        component: LayoutComponent,
      },
    ]),
    ToastModule,
  ],
  declarations: [LayoutComponent, LeftBarComponent],
})
export class LayoutModule {}
