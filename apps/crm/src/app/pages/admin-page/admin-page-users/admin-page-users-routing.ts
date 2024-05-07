import { Routes } from '@angular/router';
import { notFoundPath, rootPathTo } from 'crm/app.routes';
import { AdminPageUserRolesComponent } from './admin-page-user-roles/admin-page-user-roles.component';
import { AdminPageUsersListComponent } from './admin-page-users-list/admin-page-users-list.component';

export const adminPagesUsersRouting: Routes = [
  {
    path: 'list',
    component: AdminPageUsersListComponent,
  },
  {
    path: 'roles',
    component: AdminPageUserRolesComponent,
  },
  rootPathTo('list'),
  notFoundPath(),
];

export default adminPagesUsersRouting;
