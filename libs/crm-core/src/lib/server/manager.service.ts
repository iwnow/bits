import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonService } from './common.service';
import { ICompanyObject } from './dto';

@Injectable({ providedIn: 'root' })
export class ManagerService {
  protected common = inject(CommonService);

  companyObjects(id: number): Observable<ICompanyObject[]> {
    const url = this.common.apiUrl(`manager/companies/${id}/objects`);
    return this.common.http.get<ICompanyObject[]>(url);
  }
}
