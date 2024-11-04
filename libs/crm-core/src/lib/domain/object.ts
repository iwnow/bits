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
import { dateUtil, ket } from 'crm-utils';
import { addDTOMapper } from './to-dto';
import { City } from './city';
import { AddressInfo } from './address-info';
import { Company } from './company';

@frmGroup()
export class CompanyObject {
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

  @frmControl({
    type: 'select',
    inputs: {
      textField: ket(Company, 'name'),
      itemsLoader: 'company',
    },
    label: 'Компания',
    disabled: true,
    validators: [Validators.required],
  })
  company: Company;

  toDTO(): DTOCompanyObject {
    const dto: DTOCompanyObject = {
      ...this,
    };
    return dto;
  }
}

addDTOMapper(CompanyObject);
