import { Injectable, inject } from '@angular/core';
import { CommonService } from './common.service';
import { Observable } from 'rxjs';
import type * as CrmServerApi from './server-api';

@Injectable({ providedIn: 'root' })
export class AdminService {
  protected common = inject(CommonService);

  userList(
    args: AdminUserListRequest
  ): Observable<CrmServerApi.ListResult<CrmServerApi.User>> {
    const url = this.common.apiUrl('users/search');

    return this.common.http.post<CrmServerApi.ListResult<CrmServerApi.User>>(
      url,
      args
    );
  }

  createUser(user: Partial<CrmServerApi.User>): Observable<any> {
    const url = this.common.apiUrl('users');

    return this.common.http.post<any>(url, user);
  }

  editUser(user: Partial<CrmServerApi.User>): Observable<any> {
    const url = this.common.apiUrl('users');

    return this.common.http.patch(url, user);
  }
}

export interface AdminUserListRequest extends CrmServerApi.SearchListRequest {
  is_active?: boolean;
}
