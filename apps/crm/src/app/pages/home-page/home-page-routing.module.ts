import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: HomePageComponent,
        title: 'Избранное'
      },
    ]),
  ],
})
export class HomePageRoutingModule {}
