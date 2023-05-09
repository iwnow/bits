import { Route } from '@angular/router';
import { loggedInGuard } from '@crm/guards';

export const appRoutes: Route[] = [
    {
        path: 'entry',
        loadChildren: () => import('./pages/entry/entry.module')
    },
    {
        path: '',
        canActivate: [loggedInGuard({ redirect: { commands: ['entry', 'login'] } })],
        
    }
];
