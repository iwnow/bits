import { inject, Injectable } from '@angular/core';
import { ItemsLoaderResult, ItemsLoaderService } from './items-loader';
import { MaybeAsync } from 'crm-utils';
import { CrmClientService } from '../client';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CompanyItemsLoaderService implements ItemsLoaderService {
  crm = inject(CrmClientService);

  load(...args: any[]): MaybeAsync<ItemsLoaderResult> {
    return this.crm.company.selectCompanies().pipe(
      map((r) => ({
        data: r,
      }))
    );
  }
}
