import { CitiesLoaderService } from './cities-loader';
import { CompanyItemsLoaderService } from './company-items-loader';
import { CompanyRolesLoaderService } from './company-roles-loader';
import { DistrictsLoaderService } from './districts-loader';
import { provideItemsLoader } from './items-loader';

export * from './items-loader';

export function provideItemsLoaders() {
  return [
    provideItemsLoader('company', CompanyItemsLoaderService),
    provideItemsLoader('company-roles', CompanyRolesLoaderService),
    provideItemsLoader('cities', CitiesLoaderService),
    provideItemsLoader('districts', DistrictsLoaderService),
  ];
}
