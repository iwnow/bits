import { inject, Injector, Signal } from '@angular/core';
import {
  Router,
  ActivatedRoute,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { CrmClientService } from 'crm-core';
import { viewDestroy } from 'crm-utils';
import { Confirmation, ConfirmationService, MessageService } from 'primeng/api';
import { AdminPageService } from './admin-page.service';
import { fromEvent, map, Observable } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

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
    msgError: (msg: string) => {
      return ad.msg.add({
        severity: 'error',
        summary: 'Ошибка',
        detail: msg,
      });
    },
    msgInfo: (msg: string, title = 'Инфо') => {
      return ad.msg.add({
        severity: 'info',
        summary: title,
        detail: msg,
      });
    },
    msgSuccess: (msg: string, title = 'Инфо') => {
      return ad.msg.add({
        severity: 'success',
        summary: title,
        detail: msg,
      });
    },
    confirmPopup: (e: Confirmation) =>
      ad.confirm.confirm({
        ...e,
        key: 'confirmPopup',
      }),
    injector: inject(Injector),
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
    signalToObs: <T>(s: Signal<T>) =>
      toObservable(s, { injector: ad.injector }),
    obsToSignal: <T>(s: Observable<T>) =>
      toSignal(s, { injector: ad.injector }),
  };
  return ad;
}
