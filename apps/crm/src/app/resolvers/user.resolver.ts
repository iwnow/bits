import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { CrmClientService } from 'crm-core';
import { DTOUser } from 'crm/core/dto';

export const userResolver: ResolveFn<DTOUser> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(CrmClientService).server.admin.userId<DTOUser>(
    +route.queryParamMap.get('id')
  );
};
