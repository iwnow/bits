import { Injectable, inject } from '@angular/core';
import { CrmAuthService } from '../modules/auth/auth.service';
import { EventsBusService } from '../modules/events/events.service';
import { CrmCompanyService } from '../modules/company/company.service';

@Injectable({ providedIn: 'root' })
export class CrmClientService {
  readonly auth = inject(CrmAuthService);
  readonly events = inject(EventsBusService);
  readonly company = inject(CrmCompanyService);
}
