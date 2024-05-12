import { Injectable, inject } from '@angular/core';
import { CommonService } from './common.service';
import { Observable, map } from 'rxjs';
import type * as CrmServerApi from './server-api';

@Injectable({ providedIn: 'root' })
export class AdminService {
  protected common = inject(CommonService);

  userList(
    args: CrmServerApi.ListRequest
  ): Observable<CrmServerApi.ListResult<CrmServerApi.User>> {
    args.sort_by = args.sort_by || 'id';
    args.sort_is_desc =
      typeof args.sort_is_desc === 'boolean' ? args.sort_is_desc : true;
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
    const url = this.common.apiUrl(`users/${user.id}`);
    const body: any = {};
    Object.entries(user).forEach(([k, v]) => {
      if (v !== null) {
        body[k] = v;
      }
    });
    return this.common.http.patch(url, body);
  }

  userId<T = CrmServerApi.User>(id: number): Observable<T> {
    const url = this.common.apiUrl('users/search');
    const args: CrmServerApi.ListRequest = {
      skip: 0,
      limit: 1,
      filters: {
        op: 'AND',
        items: [
          {
            key: 'id',
            value: id,
            op: 'EQ',
          },
        ],
      },
    };

    return this.common.http
      .post<CrmServerApi.ListResult<T>>(url, args)
      .pipe(map((r) => r.data[0]));
  }
}
