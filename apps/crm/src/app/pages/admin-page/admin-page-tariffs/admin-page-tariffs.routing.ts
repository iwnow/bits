import { Routes } from '@angular/router';
import { notFoundPath, rootPathTo } from 'crm/app.routes';
import { AdminPageTariffCreateComponent } from './admin-page-tariffs-list/admin-page-tariff-create/admin-page-tariff-create.component';
import { AdminPageTariffEditComponent } from './admin-page-tariffs-list/admin-page-tariff-edit/admin-page-tariff-edit.component';
import { tariffResolver } from 'crm/resolvers/tariff.resolver';
import { AdminPageTariffEditInfoComponent } from './admin-page-tariffs-list/admin-page-tariff-edit/admin-page-tariff-edit-info/admin-page-tariff-edit-info.component';
import { AdminPageTariffsListComponent } from './admin-page-tariffs-list/admin-page-tariffs-list.component';
import { AdminPageTariffsPlaceComponent } from './admin-page-tariffs-place/admin-page-tariffs-place.component';
import { placeResolver } from 'crm/resolvers/place.resolver';

export const adminPagesTariffsRouting: Routes = [
  {
    path: 'create',
    component: AdminPageTariffCreateComponent,
  },
  {
    path: 'edit/:tariffId',
    component: AdminPageTariffEditComponent,
    resolve: {
      tariff: tariffResolver,
    },
    children: [
      {
        path: 'info',
        component: AdminPageTariffEditInfoComponent,
      },
      rootPathTo('info'),
    ],
  },
  {
    path: 'list',
    component: AdminPageTariffsListComponent,
  },
  {
    path: 'p/:placeId',
    component: AdminPageTariffsPlaceComponent,
    resolve: {
      companyPlace: placeResolver,
    },
  },
  rootPathTo('list'),
  notFoundPath(),
];

export default adminPagesTariffsRouting;
