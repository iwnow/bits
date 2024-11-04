import { Validators } from '@angular/forms';
import { frmGroup, frmControl } from 'bits-frms';
import { column } from 'bits-grid';
import { DTOAddressCity } from '../server/dto';
import { addDTOMapper } from './to-dto';

@frmGroup()
export class City implements DTOAddressCity {
  @frmControl({
    type: 'string',
    label: 'Город',
    validators: [Validators.required],
    disabled: true,
  })
  @column({
    headerName: 'Город',
    filter: 'agTextColumnFilter',
    sortable: true,
  })
  name: string;

  @frmControl({
    type: 'string',
    label: 'Таймзона',
    validators: [Validators.required],
    disabled: true,
  })
  @column({
    headerName: 'Таймзона',
    filter: 'agTextColumnFilter',
    sortable: true,
  })
  tzone: string;

  @column({
    hide: true,
  })
  @frmControl({
    type: 'number',
    label: 'Id',
    disabled: true,
    hide: true,
  })
  id: number;

  toDTO(): DTOAddressCity {
    const dto: DTOAddressCity = {
      ...this,
    };
    return dto;
  }
}

addDTOMapper(City);
