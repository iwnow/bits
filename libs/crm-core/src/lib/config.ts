import { InjectionToken, Provider, inject } from '@angular/core';

const CRM_CONFIG = new InjectionToken<ICrmConfig>('crm config');

export function provideCrmConfig(config: ICrmConfig): Provider {
  return {
    provide: CRM_CONFIG,
    useFactory: () => JSON.parse(JSON.stringify(config)),
  };
}

export function useCrmConfig() {
    return inject(CRM_CONFIG);
}

export interface ICrmConfig {
    apiBaseUrl: string;
}
