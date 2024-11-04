import { Injectable, inject } from '@angular/core';
import { CommonService } from './common.service';
import { Observable, forkJoin, map } from 'rxjs';
import {
  DTOCompanyObject,
  DTOCompanyUser,
  DTOCompanyUserObject,
  DTOListRequest,
  DTOListResult,
  DTOUser,
} from './dto';
import { CompanyService } from './company.service';
import { objectToQueryParams } from 'crm-utils';

@Injectable({ providedIn: 'root' })
export class AdminService {
  protected common = inject(CommonService);
  protected company = inject(CompanyService);

  userList(args: DTOListRequest): Observable<DTOListResult<DTOUser>> {
    const url = this.common.apiUrl('users/search');

    return this.common.http.post<DTOListResult<DTOUser>>(url, args);
  }

  createUser(user: Partial<DTOUser>): Observable<any> {
    const url = this.common.apiUrl('users');

    return this.common.http.post<any>(url, user);
  }

  editUser(user: Partial<DTOUser>): Observable<any> {
    const url = this.common.apiUrl(`users/${user.id}`);
    const body: any = {};
    Object.entries(user).forEach(([k, v]) => {
      if (v !== null) {
        body[k] = v;
      }
    });
    return this.common.http.patch(url, body);
  }

  userId(id: number) {
    const url = this.common.apiUrl('users/search');
    const args: DTOListRequest = {
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
      .post<DTOListResult<DTOUser>>(url, args)
      .pipe(map((r) => r.data[0]));
  }

  companyUser(userId: number) {
    const url = this.common.apiUrl('company-users/search');
    const args: DTOListRequest = {
      skip: 0,
      limit: 100,
      filters: {
        op: 'AND',
        items: [
          {
            key: 'user_id',
            value: userId,
            op: 'EQ',
          },
        ],
      },
    };

    return forkJoin({
      companyUsers: this.common.http
        .post<DTOListResult<DTOCompanyUser>>(url, args)
        .pipe(map((r) => r.data)),
      companies: this.company.companies(),
    }).pipe(
      map((r) => {
        r.companyUsers.forEach((cu) => {
          cu.company = r.companies.find((i) => i.id === cu.company_id);
        });
        return r.companyUsers;
      })
    );
  }

  companyUserUpdate(e: Partial<DTOCompanyUser>) {
    const url = this.common.apiUrl(`company-users/${e.id}`);
    const body: any = {
      rights: e.rights,
    };
    return this.common.http.put(url, body);
  }

  addCompanyUser(e: Partial<DTOCompanyUser>) {
    const url = this.common.apiUrl(`company-users`);
    const body: any = {
      user_id: e.user_id,
      company_id: e.company_id,
      rights: e.rights,
    };
    return forkJoin({
      companyUser: this.common.http.post(url, body),
      companies: this.company.companies(),
    }).pipe(
      map((r) => {
        e.company = r.companies.find((i) => i.id === e.company_id);
        return e;
      })
    );
  }

  removeCompanyUser(id: number) {
    const url = this.common.apiUrl(`company-users/${id}`);
    return this.common.http.delete(url);
  }

  companyUserObject(companyUserId: number, objectId: number) {
    const url = this.common.apiUrl('company-user-objects/search');
    const args: DTOListRequest = {
      skip: 0,
      limit: 100,
      filters: {
        op: 'AND',
        items: [
          {
            key: 'company_user',
            value: companyUserId,
            op: 'EQ',
          },
          {
            key: 'object_id',
            value: objectId,
            op: 'EQ',
          },
        ],
      },
    };

    return this.common.http
      .post<DTOListResult<DTOCompanyUserObject>>(url, args)
      .pipe(map((r) => r.data[0]));
  }

  createUserObject(e: Partial<DTOCompanyUserObject>) {
    const url = this.common.apiUrl(`company-user-objects`);
    return this.common.http.post(url, e);
  }

  updateUserObject(e: Partial<DTOCompanyUserObject>) {
    const url = this.common.apiUrl(`company-user-objects/${e.id}`);
    return this.common.http.put(url, e);
  }

  objectList(
    args: DTOListRequest
  ): Observable<DTOListResult<DTOCompanyObject>> {
    const url = this.common.apiUrl('objects/search');

    return this.common.http.post<DTOListResult<DTOCompanyObject>>(url, args);
  }

  object(id: number): Observable<DTOCompanyObject> {
    const url = this.common.apiUrl(`objects/${id}`);

    return this.common.http.get<DTOCompanyObject>(url);
  }

  updateObject(object: Partial<DTOCompanyObject>) {
    const url = this.common.apiUrl(`objects/${object.id}`);

    return this.common.http.patch<any>(url, object);
  }

  createObject(object: Partial<DTOCompanyObject>) {
    const url = this.common.apiUrl(`objects`);

    return this.common.http.post<any>(url, object);
  }
}
