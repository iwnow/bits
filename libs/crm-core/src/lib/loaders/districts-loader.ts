import { inject, Injectable } from '@angular/core';
import {
  ItemsLoaderResult,
  ItemsLoaderService,
  useItemsLoaderFactory,
} from './items-loader';
import { MaybeAsync, maybePromise } from 'crm-utils';
import { CrmClientService } from '../client';
import { map, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DistrictsLoaderService implements ItemsLoaderService {
  crm = inject(CrmClientService);

  load(...args: any[]): MaybeAsync<ItemsLoaderResult> {
    const cityId = args[0];
    if (cityId > 0) {
      return this.crm.server.dicts.districts(cityId).pipe(
        map((r) => ({
          data: r,
        }))
      );
    }
    return of({ data: [] });
  }
}

export function useDistrictsLoader() {
  const factory = useItemsLoaderFactory();
  return maybePromise(factory.run('districts'));
}
