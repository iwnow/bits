import { Routes } from '@angular/router';
import { notFoundPath, rootPathTo } from 'crm/app.routes';
import { AdminPageUserRolesComponent } from './admin-page-user-roles/admin-page-user-roles.component';
import { AdminPageUserCreateComponent } from './admin-page-users-list/admin-page-user-create/admin-page-user-create.component';
import { AdminPageUsersListComponent } from './admin-page-users-list/admin-page-users-list.component';
import { AdminPageUserEditComponent } from './admin-page-users-list/admin-page-user-edit/admin-page-user-edit.component';
import { userResolver } from 'crm/resolvers/user.resolver';

export const adminPagesUsersRouting: Routes = [
  {
    path: 'create',
    component: AdminPageUserCreateComponent,
  },
  {
    path: 'edit',
    component: AdminPageUserEditComponent,
    resolve: {
      user: userResolver,
    },
  },
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
