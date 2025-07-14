import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AppBarModule } from './app-bar/app-bar.module';
import { LayoutComponent } from './layout.component';
import { LeftBarModule } from './left-bar/left-bar.module';
import { appSubsystemRoutes } from 'crm/app.routes';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

@NgModule({
  imports: [
    CommonModule,
    AppBarModule,
    LeftBarModule,
    RouterModule.forChild([
      {
        path: '',
        component: LayoutComponent,
        children: appSubsystemRoutes,
      },
    ]),
    ToastModule,
    ConfirmDialogModule,
    ConfirmPopupModule,
  ],
  declarations: [LayoutComponent],
})
export class LayoutModule {}
