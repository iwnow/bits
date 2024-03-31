import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlCreationOptions } from '@angular/router';
import { CrmClientService } from 'crm-core';
import { map, take } from 'rxjs';

export const loggedInGuard: (opt: LoggedInGuardOptions) => CanActivateFn = (
  opt
) => {
  return () => {
    const router = inject(Router);
    const crm = inject(CrmClientService);
    return crm.auth.authenticated().pipe(
      take(1),
      map((authenticated) => {
        if (authenticated) {
          return true;
        }
        return router.createUrlTree(
          opt.redirect.commands,
          opt.redirect.navigationExtras
        );
      })
    );
  };
};

export type LoggedInGuardOptions = {
  redirect: {
    commands: any[];
    navigationExtras?: UrlCreationOptions;
  };
};
