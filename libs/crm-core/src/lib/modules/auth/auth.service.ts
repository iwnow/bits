import { Injectable, inject } from '@angular/core';
import { CrmAuthLoginParams } from './contracts';
import { CrmServerService } from '../../server/server.service';

@Injectable({providedIn: 'root'})
export class CrmAuthService {
    protected server = inject(CrmServerService)

    login(params: CrmAuthLoginParams) {
        this.server.auth.login(params).subscribe({
            error: console.error,
            next: console.log,
        });
    }
}