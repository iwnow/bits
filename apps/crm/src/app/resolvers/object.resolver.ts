import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { CrmClientService } from 'crm-core';
import { DTO } from 'crm-core';

export const objectResolver: ResolveFn<DTO.DTOCompanyObject> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(CrmClientService).server.admin.object(
    +route.paramMap.get('objectId')
  );
};
