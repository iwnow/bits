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
import { ket, propFrom } from 'crm-utils';

@frmGroup()
export class AddressInfo implements DTOAddressInfo {
  @column({
    hide: true,
  })
  id: number;

  // @frmGroup(City)
  @frmControl({
    type: 'select',
    inputs: {
      textField: propFrom<DTOAddressCity>('name'),
      itemsLoader: 'cities',
      initValueAfterItemsLoaderById: true,
    },
    label: 'Город',
    validators: [Validators.required],
  })
  city: DTOAddressCity;

  @frmControl({
    type: 'select',
    inputs: {
      textField: propFrom<DTOAddressDistrict>('name'),
      itemsLoader: 'districts',
      itemsLoaderArgs: [{ context: 'thisFormGroup', getter: 'city.id' }],
      refreshControlOnChange: 'city',
      initValueAfterItemsLoaderById: 'district_id',
    },
    label: 'Район',
    validators: [Validators.required],
  })
  district: DTOAddressDistrict;

  @frmControl({
    type: 'number',
    hide: true,
  })
  district_id: number;

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

  toDTO(): DTOAddressInfo {
    const dto: AddressInfo = {
      ...this,
    };
    return dto;
  }
}

addDTOMapper(AddressInfo);
