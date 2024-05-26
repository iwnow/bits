import { Routes } from '@angular/router';
import { notFoundPath, rootPathTo } from 'crm/app.routes';
import { AdminPageUserRolesComponent } from './admin-page-user-roles/admin-page-user-roles.component';
import { AdminPageUserCreateComponent } from './admin-page-users-list/admin-page-user-create/admin-page-user-create.component';
import { AdminPageUsersListComponent } from './admin-page-users-list/admin-page-users-list.component';
import { AdminPageUserEditComponent } from './admin-page-users-list/admin-page-user-edit/admin-page-user-edit.component';
import { userResolver } from 'crm/resolvers/user.resolver';
import { AdminPageUserEditInfoComponent } from './admin-page-users-list/admin-page-user-edit/admin-page-user-edit-info/admin-page-user-edit-info.component';
import { userCompanyResolver } from 'crm/resolvers/user-company.resolver';
import { AdminPageUserEditCompanyComponent } from './admin-page-users-list/admin-page-user-edit/admin-page-user-edit-company/admin-page-user-edit-company.component';

export const adminPagesUsersRouting: Routes = [
  {
    path: 'create',
    component: AdminPageUserCreateComponent,
  },
  {
    path: 'edit/:userId',
    component: AdminPageUserEditComponent,
    resolve: {
      user: userResolver,
      userCompany: userCompanyResolver,
    },
    children: [
      {
        path: 'info',
        component: AdminPageUserEditInfoComponent,
      },
      {
        path: 'company/:companyId',
        component: AdminPageUserEditCompanyComponent,
      },
      rootPathTo('info'),
    ],
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
