import { Injectable, inject } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { CommonService } from './common.service';
import { DTOCompanyObject } from './dto';
import {
  Extendable,
  objectExcludeProps,
  objectToSearchString,
} from 'crm-utils';
import { DTO } from 'crm-core';

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
      'order_customer',
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

  place(id) {
    const url = this.common.apiUrl(`places/${id}`);
    return this.common.http.get<DTO.DTOPlace>(url);
  }

  bookingsPromise(
    params: Extendable<{ placeId; date_from; date_to }>
  ): Promise<any[]> {
    const { placeId } = params;
    params.with_entities = params.with_entities || [
      'order',
      'order_customer',
      'order_legal',
      'section',
    ];
    params.is_deleted = false;
    let url = this.common.apiUrl(`manager/places/${placeId}/bookings`);
    const restParams = objectExcludeProps(params, 'placeId');
    const search = objectToSearchString(restParams);
    url += `?${search}`;
    return firstValueFrom(this.common.http.get<Array<any>>(url));
  }
}
