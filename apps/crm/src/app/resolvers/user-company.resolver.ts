import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { CrmClientService } from 'crm-core';
import { DTO } from 'crm-core';

export const userCompanyResolver: ResolveFn<DTO.DTOCompanyUser[]> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(CrmClientService).server.admin.companyUser(
    +route.paramMap.get('userId')
  );
};
