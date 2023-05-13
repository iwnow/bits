import { Route } from '@angular/router';
import { loggedInGuard } from 'crm/guards';
import { loadChildrenByLayout } from 'crm/layout';

export const appRoutes: Route[] = [
    {
        path: 'entry',
        loadChildren: () => import('./pages/entry/entry.module')
    },
    {
        path: '',
        canActivate: [loggedInGuard({ redirect: { commands: ['entry', 'login'] } })],
        loadChildren: loadChildrenByLayout({
            desktop: () => import('crm/layout/desktop/desktop.module').then(m => m.DesktopModule),
            mobile: () => import('crm/layout/mobile/mobile.module').then(m => m.MobileModule),
        })
    }
];
