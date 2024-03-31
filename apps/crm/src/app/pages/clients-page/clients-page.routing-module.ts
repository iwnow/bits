import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClientsPageComponent } from './clients-page.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        title: 'Клиенты',
        component: ClientsPageComponent,
      },
    ]),
  ],
})
export class ClientsPageRoutingModule {}
