import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlCreationOptions } from '@angular/router';

const loggedIn = true;

export const loggedInGuard: (opt: LoggedInGuardOptions) => CanActivateFn = (opt) => {
  return () => {
    if (loggedIn) {
      return true;
    }
    const router = inject(Router);
    return router.createUrlTree(opt.redirect.commands, opt.redirect.navigationExtras);
  };
};

export type LoggedInGuardOptions = {
    redirect: {
        commands: any[];
        navigationExtras?: UrlCreationOptions;
    }
}