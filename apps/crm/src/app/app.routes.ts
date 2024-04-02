import { Route } from '@angular/router';
import { loggedInGuard } from './guards';
import { Page404Component } from './page-404.component';

export const appSubsystemRoutes: Route[] = [
  {
    path: 'clients',
    loadChildren: () => import('./pages/clients-page/clients-page.module'),
  },
  {
    path: '',
    loadChildren: () => import('./pages/home-page/home-page.module'),
  },
  {
    path: '**',
    component: Page404Component,
    title: '404',
  },
];

export const appBaseRoutes: Route[] = [
  {
    path: 'entry',
    loadChildren: () => import('./pages/entry/entry.module'),
  },
  {
    path: '',
    canActivate: [
      loggedInGuard({ redirect: { commands: ['entry', 'login'] } }),
    ],
    loadChildren: () =>
      import('./layout/layout.module').then((m) => m.LayoutModule),
  },
];
