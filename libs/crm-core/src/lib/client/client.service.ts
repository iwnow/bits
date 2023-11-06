import { Injectable, inject } from '@angular/core';
import { CrmAuthService } from '../modules/auth/auth.service';

@Injectable({providedIn: 'root'})
export class CrmClientService {
    readonly auth = inject(CrmAuthService);
}
