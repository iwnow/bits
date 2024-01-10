import { Injectable, inject } from '@angular/core';
import { AuthService } from './auth.service';
import { CompanyService } from './company.service';

@Injectable({ providedIn: 'root' })
export class CrmServerService {
  readonly auth = inject(AuthService);
  readonly company = inject(CompanyService);
}
