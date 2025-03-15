import { Route } from '@angular/router';
import { loggedInGuard } from './guards';
import { Page404Component } from './page-404.component';
import { adminGuard } from './guards/admin-guard';

export const appSubsystemRoutes: Route[] = [
  {
    path: 'crm',
    loadChildren: () => import('./pages/crm-page/crm-page.routing'),
  },
  {
    path: 'admin',
    canActivate: [adminGuard()],
    loadChildren: () => import('./pages/admin-page/admin-page.routing'),
  },
  {
    path: '',
    // loadChildren: () => import('./pages/home-page/home-page.module'),
    pathMatch: 'full',
    redirectTo: 'admin',
  },
  notFoundPath(),
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

export function notFoundPath(): Route {
  return {
    path: '**',
    component: Page404Component,
    title: '404',
  };
}

export function rootPathTo(path: string): Route {
  return {
    path: '',
    pathMatch: 'full',
    redirectTo: path,
  };
}
