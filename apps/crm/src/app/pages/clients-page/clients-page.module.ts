import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsPageComponent } from './clients-page.component';
import { ClientsPageRoutingModule } from './clients-page.routing-module';

@NgModule({
  imports: [CommonModule, ClientsPageRoutingModule],
  declarations: [ClientsPageComponent],
})
export default class ClientsPageModule {}
