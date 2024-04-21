import { Routes } from '@angular/router';
import { AdminPageComponent } from './admin-page.component';
import { AdminPageUserListComponent } from './admin-page-user-list/admin-page-user-list.component';

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
        path: '**',
        redirectTo: 'users',
      },
    ],
  },
];

export default adminPagesRouting;
