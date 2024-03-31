import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { ListboxModule } from 'primeng/listbox';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { FormsModule } from '@angular/forms';
import { AppBarComponent } from './app-bar.component';

@NgModule({
  imports: [
    CommonModule,
    ToolbarModule,
    ButtonModule,
    OverlayPanelModule,
    ListboxModule,
    FormsModule,
    AvatarModule,
    InputTextModule,
    MenuModule,
    TieredMenuModule,
  ],
  declarations: [AppBarComponent],
  exports: [AppBarComponent],
})
export class AppBarModule {}
