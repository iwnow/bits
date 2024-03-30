import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeftBarComponent } from './left-bar.component';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, ButtonModule, RouterModule],
  declarations: [LeftBarComponent],
  exports: [LeftBarComponent],
})
export class LeftBarModule {}
