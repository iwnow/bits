import { CompanyItemsLoaderService } from './company-items-loader';
import { CompanyRolesLoaderService } from './company-roles-loader';
import { provideItemsLoader } from './items-loader';

export * from './items-loader';


export function provideItemsLoaders() {
    return [
        provideItemsLoader('company', CompanyItemsLoaderService),
        provideItemsLoader('company-roles', CompanyRolesLoaderService),
    ]
}