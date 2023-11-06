import { Injectable, inject } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class CrmServerService {
  readonly auth = inject(AuthService);
}
