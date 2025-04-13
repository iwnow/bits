import { Routes } from '@angular/router';
import adminPagesObjectsRouting from './admin-page-objects/admin-page-objects-routing';
import { AdminPageObjectsComponent } from './admin-page-objects/admin-page-objects.component';
import adminPagesPlacesRouting from './admin-page-places/admin-page-places-routing';
import { AdminPagePlacesComponent } from './admin-page-places/admin-page-places.component';
import adminPagesTariffsRouting from './admin-page-tariffs/admin-page-tariffs.routing';
import { adminPagesUsersRouting } from './admin-page-users/admin-page-users-routing';
import { AdminPageUsersComponent } from './admin-page-users/admin-page-users.component';
import { AdminPageComponent } from './admin-page.component';

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
        path: 'places',
        component: AdminPagePlacesComponent,
        children: adminPagesPlacesRouting,
      },
      {
        path: 'tariffs',
        children: adminPagesTariffsRouting,
      },
      {
        path: '**',
        redirectTo: 'users',
      },
    ],
  },
];

export default adminPagesRouting;
