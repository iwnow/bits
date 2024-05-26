import { inject } from '@angular/core';
import {
  Router,
  ActivatedRoute,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { CrmClientService } from 'crm-core';
import { viewDestroy } from 'crm-utils';
import { MessageService } from 'primeng/api';
import { AdminPageService } from './admin-page.service';

export function useAdminCommon() {
  const ad = {
    crm: inject(CrmClientService),
    msg: inject(MessageService),
    destroy$: viewDestroy(),
    page: inject(AdminPageService),
    router: inject(Router),
    route: inject(ActivatedRoute),
    toRootRoute: () => {
      const seg = ad.router.url.split('/').filter(Boolean).slice(0, 2);
      ad.router.navigate(seg);
    },
  };
  return ad;
}
