import { Validators } from '@angular/forms';
import { frmControl, frmGroup } from 'bits-frms';
import { column, jsonColumnDesc } from 'bits-grid';
import { GridCellRenderCompanyNameComponent } from '../components/grid-cell-render-company-name.component';
import { DTOTariff } from '../server/dto';
import { CompanyObject } from './object';
import { addDTOMapper } from './to-dto';

@frmGroup()
export class CompanyTariff {
  @column({
    hide: false,
    width: 80,
  })
  @frmControl({
    type: 'number',
    label: 'Id',
    disabled: true,
    hide: true,
  })
  id: number;

  @frmControl({
    type: 'string',
    label: 'Название',
    validators: [Validators.required],
  })
  @column({
    headerName: 'Название',
    filter: 'agTextColumnFilter',
    sortable: true,
  })
  name: string;

  @column({
    headerName: 'Компания',
    field: 'company_id',
    cellRenderer: GridCellRenderCompanyNameComponent,
  })
  company_id: number;

  @column({
    headerName: 'Данные',
    valueFormatter: (e) =>
      !e.value
        ? ''
        : `${e.value.periods
            ?.map((i) => `c ${i.start} по ${i.end} ${i.amount}р.`)
            .join(' ')} `,
  })
  data: any;

  toDTO(): DTOTariff {
    const dto: DTOTariff = {
      ...(this as any),
    };
    return dto;
  }
}

addDTOMapper(CompanyObject);
