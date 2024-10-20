import { Routes } from '@angular/router';
import { AdminPageObjectsComponent } from './admin-page-objects/admin-page-objects.component';
import { AdminPageTariffsComponent } from './admin-page-tariffs/admin-page-tariffs.component';
import { AdminPageUsersComponent } from './admin-page-users/admin-page-users.component';
import { adminPagesUsersRouting } from './admin-page-users/admin-page-users-routing';
import { AdminPageComponent } from './admin-page.component';
import adminPagesObjectsRouting from './admin-page-objects/admin-page-objects-routing';

export const adminPagesRouting: Routes = [
  {
    path: '',
    component: AdminPageComponent,
    title: 'Администрирование',
    children: [
      {
        path: 'users',
        component: AdminPageUsersComponent,
        children: adminPagesUsersRouting,
      },
      {
        path: 'objects',
        component: AdminPageObjectsComponent,
        children: adminPagesObjectsRouting,
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
