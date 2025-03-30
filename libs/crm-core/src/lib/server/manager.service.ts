import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonService } from './common.service';
import { DTOCompanyObject } from './dto';
import {
  Extendable,
  objectExcludeProps,
  objectToSearchString,
} from 'crm-utils';

@Injectable({ providedIn: 'root' })
export class ManagerService {
  protected common = inject(CommonService);

  companyObjects(id: number): Observable<DTOCompanyObject[]> {
    const url = this.common.apiUrl(`manager/companies/${id}/objects`);
    return this.common.http.get<DTOCompanyObject[]>(url);
  }

  bookings(
    params: Extendable<{ placeId; date_from; date_to }>
  ): Observable<any[]> {
    const { placeId } = params;
    params.with_entities = params.with_entities || [
      'order',
      'order_contact',
      'order_legal',
      'section',
    ];
    params.is_deleted = false;
    let url = this.common.apiUrl(`manager/places/${placeId}/bookings`);
    const restParams = objectExcludeProps(params, 'placeId');
    const search = objectToSearchString(restParams);
    url += `?${search}`;
    return this.common.http.get<Array<any>>(url);
  }
}
