import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { CrmClientService } from 'crm-core';
import { DTO } from 'crm-core';

export const userResolver: ResolveFn<DTO.DTOUser> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(CrmClientService).server.admin.userId<DTO.DTOUser>(
    +route.queryParamMap.get('id')
  );
};
