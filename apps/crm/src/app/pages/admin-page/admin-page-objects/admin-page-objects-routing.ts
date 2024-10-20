import { Routes } from '@angular/router';
import { notFoundPath, rootPathTo } from 'crm/app.routes';
import { AdminPageObjectsListComponent } from './admin-page-objects-list/admin-page-objects-list.component';

export const adminPagesObjectsRouting: Routes = [
  // {
  //   path: 'create',
  //   component: AdminPageUserCreateComponent,
  // },
  // {
  //   path: 'edit/:userId',
  //   component: AdminPageUserEditComponent,
  //   resolve: {
  //     user: userResolver,
  //     userCompany: userCompanyResolver,
  //   },
  //   children: [
  //     {
  //       path: 'info',
  //       component: AdminPageUserEditInfoComponent,
  //     },
  //     {
  //       path: 'company/:companyId',
  //       component: AdminPageUserEditCompanyComponent,
  //     },
  //     rootPathTo('info'),
  //   ],
  // },
  {
    path: 'list',
    component: AdminPageObjectsListComponent,
  },
  rootPathTo('list'),
  notFoundPath(),
];

export default adminPagesObjectsRouting;
