import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobileComponent } from './mobile.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: MobileComponent,
      },
    ]),
  ],
  declarations: [MobileComponent],
})
export class MobileModule {}
