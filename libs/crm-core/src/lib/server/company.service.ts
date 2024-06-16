import { HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CommonService } from './common.service';
import { DTOCompany } from './dto';
import { of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CompanyService {
  protected common = inject(CommonService);

  protected lastCompanies: DTOCompany[];

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
        tap((r) => {
          this.lastCompanies = r;
        })
      );
  }
}
