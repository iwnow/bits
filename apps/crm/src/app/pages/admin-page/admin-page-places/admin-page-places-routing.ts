import { Routes } from '@angular/router';
import { notFoundPath, rootPathTo } from 'crm/app.routes';
import { placeResolver } from 'crm/resolvers/place.resolver';
import { AdminPagePlaceCreateComponent } from './admin-page-places-list/admin-page-place-create/admin-page-place-create.component';
import { AdminPagePlaceEditInfoComponent } from './admin-page-places-list/admin-page-place-edit/admin-page-place-edit-info/admin-page-place-edit-info.component';
import { AdminPagePlaceEditComponent } from './admin-page-places-list/admin-page-place-edit/admin-page-place-edit.component';
import { AdminPagePlacesListComponent } from './admin-page-places-list/admin-page-places-list.component';
import { AdminPagePlaceEditWorkshedsComponent } from './admin-page-places-list/admin-page-place-edit/admin-page-place-edit-worksheds/admin-page-place-edit-worksheds.component';

export const adminPagesPlacesRouting: Routes = [
  {
    path: 'create',
    component: AdminPagePlaceCreateComponent,
  },
  {
    path: 'edit/:placeId',
    component: AdminPagePlaceEditComponent,
    resolve: {
      companyPlace: placeResolver,
    },
    children: [
      {
        path: 'info',
        component: AdminPagePlaceEditInfoComponent,
      },
      {
        path: 'workscheds',
        component: AdminPagePlaceEditWorkshedsComponent,
      },
      rootPathTo('info'),
    ],
  },
  {
    path: 'list',
    component: AdminPagePlacesListComponent,
  },
  rootPathTo('list'),
  notFoundPath(),
];

export default adminPagesPlacesRouting;
