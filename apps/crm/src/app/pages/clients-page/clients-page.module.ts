import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsPageComponent } from './clients-page.component';
import { ClientsPageRoutingModule } from './clients-page.routing-module';
import { BitsGridComponent } from 'bits-grid';

@NgModule({
  imports: [CommonModule, ClientsPageRoutingModule, BitsGridComponent],
  declarations: [ClientsPageComponent],
})
export default class ClientsPageModule {}
