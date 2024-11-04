import {
  inject,
  Injectable,
  InjectionToken,
  Injector,
  Provider,
  Type,
} from '@angular/core';
import { Extendable, MaybeAsync } from 'crm-utils';

export type ItemsLoaderResult = Extendable<{ data: any[] }>;

export type ItemsLoader =
  | ((...args: any[]) => MaybeAsync<ItemsLoaderResult>)
  | string;

export interface ItemsLoaderService {
  load(...args: any[]): MaybeAsync<ItemsLoaderResult>;
}

const ItemsLoaderToken = new InjectionToken('Items loader');

const names = new Set<string>();

export function provideItemsLoader<T extends ItemsLoaderService>(
  name: string,
  type: Type<T>
): Provider {
  if (names.has(name)) {
    throw new Error(`Duplicate items loader ${name}`);
  }
  names.add(name);
  (type as any).$itemsLoaderName = name;
  return {
    multi: true,
    provide: ItemsLoaderToken,
    useClass: type,
  };
}

@Injectable({ providedIn: 'root' })
export class ItemsLoaderFactory {
  protected inj = inject(Injector);

  run(loader: ItemsLoader, ...args: any): MaybeAsync<ItemsLoaderResult> {
    if (typeof loader === 'function') {
      return loader(...args);
    }
    const loaders = this.inj.get<ItemsLoaderService[]>(ItemsLoaderToken, []);
    const loaderService = loaders.find(
      (l) => Object.getPrototypeOf(l).constructor.$itemsLoaderName === loader
    );
    if (!loaderService) {
      throw new Error(`ItemLoader '${loader}' not found`);
    }
    return loaderService.load(...args);
  }
}
