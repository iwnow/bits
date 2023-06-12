import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICrmConfig, provideCrmConfig } from './config';

@NgModule({
  imports: [CommonModule],
})
export class CrmCoreModule {
  static forRoot(config: ICrmConfig): ModuleWithProviders<CrmCoreModule> {
    return {
      ngModule: CrmCoreModule,
      providers: [
        provideCrmConfig(config)
      ]
    }
  }
}
