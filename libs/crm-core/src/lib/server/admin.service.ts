import { Injectable, inject } from '@angular/core';
import { CommonService } from './common.service';
import { Observable } from 'rxjs';
import type * as CrmServerApi from './server-api';

@Injectable({ providedIn: 'root' })
export class AdminService {
  protected common = inject(CommonService);

  userList(args: AdminUserListRequest): Observable<CrmServerApi.User[]> {
    const url = this.common.apiUrl('admin/user');

    return this.common.http.get<CrmServerApi.User[]>(url, {
      params: args as any,
    });
  }
}

export interface AdminUserListRequest extends CrmServerApi.SearchListRequest {
  is_active?: boolean;
}
