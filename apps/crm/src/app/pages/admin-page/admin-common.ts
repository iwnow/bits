import { inject } from '@angular/core';
import {
  Router,
  ActivatedRoute,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { CrmClientService } from 'crm-core';
import { viewDestroy } from 'crm-utils';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AdminPageService } from './admin-page.service';
import { fromEvent, map } from 'rxjs';

const EVENT_updateNavMenu = 'crm:admin:updateNavMenu';

export function useAdminCommon() {
  const ad = {
    crm: inject(CrmClientService),
    msg: inject(MessageService),
    destroy$: viewDestroy(),
    page: inject(AdminPageService),
    router: inject(Router),
    route: inject(ActivatedRoute),
    confirm: inject(ConfirmationService),
    toRootRoute: () => {
      const seg = ad.router.url.split('/').filter(Boolean).slice(0, 2);
      ad.router.navigate(seg);
    },
    updateNavMenu: (data?: any) => {
      window.dispatchEvent(
        new CustomEvent(EVENT_updateNavMenu, { detail: data })
      );
    },
    onUpdateNavMenu: () =>
      fromEvent<CustomEvent>(window, EVENT_updateNavMenu).pipe(
        map((e) => e.detail)
      ),
  };
  return ad;
}
