import { Routes } from '@angular/router';
import { notFoundPath, rootPathTo } from 'crm/app.routes';
import { AdminPageObjectsListComponent } from './admin-page-objects-list/admin-page-objects-list.component';
import { AdminPageObjectEditComponent } from './admin-page-objects-list/admin-page-object-edit/admin-page-object-edit.component';
import { objectResolver } from 'crm/resolvers/object.resolver';
import { AdminPageObjectEditInfoComponent } from './admin-page-objects-list/admin-page-object-edit/admin-page-object-edit-info/admin-page-object-edit-info.component';

export const adminPagesObjectsRouting: Routes = [
  // {
  //   path: 'create',
  //   component: AdminPageUserCreateComponent,
  // },
  {
    path: 'edit/:objectId',
    component: AdminPageObjectEditComponent,
    resolve: {
      companyObject: objectResolver,
    },
    children: [
      {
        path: 'info',
        component: AdminPageObjectEditInfoComponent,
      },
      // {
      //   path: 'company/:companyId',
      //   component: AdminPageUserEditCompanyComponent,
      // },
      rootPathTo('info'),
    ],
  },
  {
    path: 'list',
    component: AdminPageObjectsListComponent,
  },
  rootPathTo('list'),
  notFoundPath(),
];

export default adminPagesObjectsRouting;
