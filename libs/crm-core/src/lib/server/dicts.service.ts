import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CommonService } from './common.service';
import { DTOAddressCity, DTOAddressDistrict, DTOListResult } from './dto';

@Injectable({ providedIn: 'root' })
export class DictsService {
  protected common = inject(CommonService);

  cities(cityId?: number): Observable<DTOAddressCity[]> {
    if (cityId > 0) {
      const url = this.common.apiUrl(`cities/${cityId}`);
      return this.common.http
        .get<DTOAddressCity>(url)
        .pipe(map((city) => [city]));
    }
    const url = this.common.apiUrl(`cities`);
    return this.common.http
      .get<DTOListResult<DTOAddressCity>>(url)
      .pipe(map((r) => r.data));
  }

  districts(cityId: number): Observable<DTOAddressDistrict[]> {
    const url = this.common.apiUrl(`cities/${cityId}/districts`);
    return this.common.http
      .get<DTOListResult<DTOAddressDistrict>>(url)
      .pipe(map((r) => r.data));
  }
}
