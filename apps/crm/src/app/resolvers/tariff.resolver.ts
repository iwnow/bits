import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { CrmClientService } from 'crm-core';
import { DTO } from 'crm-core';

export const tariffResolver: ResolveFn<DTO.DTOTariff> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(CrmClientService).server.admin.tariff(
    +route.paramMap.get('tariffId')
  );
};
