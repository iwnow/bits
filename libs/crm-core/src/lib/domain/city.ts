import { Validators } from '@angular/forms';
import { frmGroup, frmControl } from 'bits-frms';
import { column } from 'bits-grid';
import { DTOCity } from '../server/dto';
import { addDTOMapper } from './to-dto';

@frmGroup()
export class City implements DTOCity {
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

  @frmControl({
    type: 'string',
    label: 'Таймзона',
    validators: [Validators.required],
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
  id: number;

  toDTO(): DTOCity {
    const dto: DTOCity = {
      ...this,
    };
    return dto;
  }
}

addDTOMapper(City);
