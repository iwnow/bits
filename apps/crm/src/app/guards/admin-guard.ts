import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlCreationOptions } from '@angular/router';
import { CrmClientService } from 'crm-core';
import { map, take } from 'rxjs';
import { RedirectGuardOptions } from './logged-in-guard';

export const adminGuard: (opt?: RedirectGuardOptions) => CanActivateFn = (
  opt
) => {
  return () => {
    const router = inject(Router);
    const crm = inject(CrmClientService);
    return crm.auth.authenticated().pipe(
      take(1),
      map((authenticated) => {
        if (authenticated && crm.auth.isAdmin) {
          return true;
        }
        if (opt?.redirect?.commands) {
          return router.createUrlTree(
            opt.redirect.commands,
            opt.redirect.navigationExtras
          );
        }
        return router.createUrlTree(['/']);
      })
    );
  };
};
