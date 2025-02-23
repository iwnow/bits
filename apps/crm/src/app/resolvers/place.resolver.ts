import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { CrmClientService } from 'crm-core';
import { DTO } from 'crm-core';

export const placeResolver: ResolveFn<DTO.DTOPlace> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(CrmClientService).server.admin.place(
    +route.paramMap.get('placeId')
  );
};
