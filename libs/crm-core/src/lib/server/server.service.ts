import { Injectable, inject } from '@angular/core';
import { AuthService } from './auth.service';
import { CompanyService } from './company.service';
import { AdminService } from './admin.service';
import { ManagerService } from './manager.service';
import { DictsService } from './dicts.service';

@Injectable({ providedIn: 'root' })
export class CrmServerService {
  readonly auth = inject(AuthService);
  readonly company = inject(CompanyService);
  readonly admin = inject(AdminService);
  readonly manager = inject(ManagerService);
  readonly dicts = inject(DictsService);
}
