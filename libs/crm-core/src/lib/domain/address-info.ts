import { Validators } from '@angular/forms';
import { frmControl, frmGroup } from 'bits-frms';
import { column } from 'bits-grid';
import {
  DTOAddressCity,
  DTOAddressDistrict,
  DTOAddressInfo,
} from '../server/dto';
import { addDTOMapper } from './to-dto';
import { City } from './city';

@frmGroup()
export class AddressInfo implements DTOAddressInfo {
  @column({
    hide: true,
  })
  id: number;

  @frmControl({
    type: 'string',
    label: 'Адрес',
    validators: [Validators.required],
  })
  @column({
    headerName: 'Адрес',
    filter: 'agTextColumnFilter',
    sortable: true,
  })
  address: string;

  @frmGroup(City)
  city: DTOAddressCity;

  district: DTOAddressDistrict;

  toDTO(): DTOAddressInfo {
    const dto: AddressInfo = {
      ...this,
    };
    return dto;
  }
}

addDTOMapper(AddressInfo);
