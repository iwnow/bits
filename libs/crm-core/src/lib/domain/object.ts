import { Validators } from '@angular/forms';
import { frmControl, frmGroup } from 'bits-frms';
import { column } from 'bits-grid';
import {
  DTOAddressCity,
  DTOAddressDistrict,
  DTOAddressInfo,
  DTOCompanyObject,
  DTOPlace,
} from '../server/dto';
import { dateUtil } from 'crm-utils';
import { addDTOMapper } from './to-dto';
import { City } from './city';
import { AddressInfo } from './address-info';

@frmGroup()
export class CompanyObject {
  @column({
    hide: true,
  })
  id: number;

  @frmControl({
    type: 'string',
    label: 'Имя',
    validators: [Validators.required],
  })
  @column({
    headerName: 'Имя',
    filter: 'agTextColumnFilter',
    sortable: true,
  })
  name: string;

  @frmGroup(AddressInfo)
  @column({
    headerName: 'Адрес',
    field: 'address_info.address',
  })
  address_info: DTOAddressInfo;

  @column({
    headerName: 'Город',
    field: 'address_info.city.name',
  })
  city: DTOAddressCity;

  district: DTOAddressDistrict;
  places: DTOPlace[];

  @column({
    headerName: 'Компания',
    field: 'company.name',
  })
  company_name: string;

  toDTO(): DTOCompanyObject {
    const dto: DTOCompanyObject = {
      ...this,
    };
    return dto;
  }
}

addDTOMapper(CompanyObject);
