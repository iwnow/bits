import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { useCompanyItemsLoader } from '../loaders/company-items-loader';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  template: `{{ companyName }}`,
})
export class GridCellRenderCompanyNameComponent
  implements ICellRendererAngularComp
{
  static companies: any[];
  static companiesIndex: Record<number, any> = {};
  itemsLoader = useCompanyItemsLoader();
  companyName = '';

  async agInit(params) {
    const companyId = this.getValueToDisplay(params);
    if (!GridCellRenderCompanyNameComponent.companies) {
      GridCellRenderCompanyNameComponent.companies =
        await this.itemsLoader.then((r) => r.data);
      GridCellRenderCompanyNameComponent.companies.forEach((c) => {
        GridCellRenderCompanyNameComponent.companiesIndex[c.id] = c;
      });
    }
    this.companyName =
      GridCellRenderCompanyNameComponent.companiesIndex[companyId]?.name || '';
  }

  refresh(params) {
    return true;
  }

  getValueToDisplay(params) {
    return params.valueFormatted ? params.valueFormatted : params.value;
  }
}
