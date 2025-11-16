import { inject, Injectable } from '@angular/core';
import {
  ItemsLoaderResult,
  ItemsLoaderService,
  useItemsLoaderFactory,
} from './items-loader';
import { MaybeAsync, maybePromise } from 'crm-utils';
import { CrmClientService } from '../client';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CitiesLoaderService implements ItemsLoaderService {
  crm = inject(CrmClientService);

  load(...args: any[]): MaybeAsync<ItemsLoaderResult> {
    return this.crm.server.dicts.cities().pipe(
      map((r) => ({
        data: r,
      }))
    );
  }
}

export function useCitiesLoader() {
  const factory = useItemsLoaderFactory();
  return maybePromise(factory.run('cities'));
}
