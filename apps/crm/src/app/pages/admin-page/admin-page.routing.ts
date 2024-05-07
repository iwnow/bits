import { Routes } from '@angular/router';
import { AdminPageComponent } from './admin-page.component';
import { AdminPageUserListComponent } from './admin-page-user-list/admin-page-user-list.component';
import { AdminPageObjectsComponent } from './admin-page-objects/admin-page-objects.component';
import { AdminPageTariffsComponent } from './admin-page-tariffs/admin-page-tariffs.component';

export const adminPagesRouting: Routes = [
  {
    path: '',
    component: AdminPageComponent,
    title: 'Администрирование',
    children: [
      {
        path: 'users',
        component: AdminPageUserListComponent,
      },
      {
        path: 'objects',
        component: AdminPageObjectsComponent,
      },
      {
        path: 'tariffs',
        component: AdminPageTariffsComponent,
      },
      {
        path: '**',
        redirectTo: 'users',
      },
    ],
  },
];

export default adminPagesRouting;
