import { Injectable, inject } from '@angular/core';
import { CrmAuthService } from '../modules/auth/auth.service';
import { EventsBusService } from '../modules/events/events.service';
import { CrmCompanyService } from '../modules/company/company.service';
import { CrmServerService } from '../server/server.service';

@Injectable({ providedIn: 'root' })
export class CrmClientService {
  readonly auth = inject(CrmAuthService);
  readonly events = inject(EventsBusService);
  readonly company = inject(CrmCompanyService);
  readonly server = inject(CrmServerService);
}

export function useCrm() {
  return inject(CrmClientService);
}