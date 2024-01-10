import { Injectable, inject } from '@angular/core';
import { CommonService } from './common.service';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CompanyService {
  protected common = inject(CommonService);

  companies() {
    const url = this.common.apiUrl('companies');
    const params = new HttpParams().append('skip', 0).append('limit', 100);
    return this.common.http.get<DTOCompany[]>(url, {
      params,
    });
  }
}

export interface DTOCompany {
  name: string;
  id: number;
}
