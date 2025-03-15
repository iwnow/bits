import { Routes } from '@angular/router';

export const crmPagesRouting: Routes = [
  {
    path: 'calendar',
    loadChildren: () => import('./calendar-page/calendar-page.routing'),
  },
];

export default crmPagesRouting;
