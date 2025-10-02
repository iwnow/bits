import { HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CommonService } from './common.service';
import { DTOCompany, DTOCompanyRole } from './dto';
import { map, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CompanyService {
  protected common = inject(CommonService);

  protected lastCompanies: DTOCompany[];
  protected lastCompanyRoles: DTOCompanyRole[];

  companies(invalidate = false) {
    if (this.lastCompanies && !invalidate) {
      return of(structuredClone(this.lastCompanies));
    }
    const url = this.common.apiUrl('companies');
    const params = new HttpParams().append('skip', 0).append('limit', 100);
    return this.common.http
      .get<DTOCompany[]>(url, {
        params,
      })
      .pipe(
        map((r) => structuredClone(r)),
        tap((r) => {
          this.lastCompanies = r;
        })
      );
  }

  companyRoles(invalidate = false) {
    if (this.lastCompanyRoles && !invalidate) {
      return of(structuredClone(this.lastCompanyRoles));
    }
    const url = this.common.apiUrl('roles/company');
    return this.common.http.get<DTOCompanyRole[]>(url).pipe(
      map((r) => structuredClone(r)),
      tap((r) => {
        this.lastCompanyRoles = r;
      })
    );
  }
}
