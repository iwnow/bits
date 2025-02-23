import { Validators } from '@angular/forms';
import { frmControl, frmGroup } from 'bits-frms';
import { column, jsonColumnDesc } from 'bits-grid';
import {
  DTOAddressCity,
  DTOAddressDistrict,
  DTOAddressInfo,
  DTOCompanyObject,
  DTOPlace,
  DTOYookassaOptions,
} from '../server/dto';
import { dateUtil, ket } from 'crm-utils';
import { addDTOMapper } from './to-dto';
import { City } from './city';
import { AddressInfo } from './address-info';
import { Company } from './company';
import { YookassaOptions } from './yookassa';

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
    label: 'Название',
    validators: [Validators.required],
  })
  @column({
    headerName: 'Название',
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

  @frmControl({
    type: 'select',
    inputs: {
      valueField: 'name',
      textField: 'name',
      items: [{ name: 'YOOKASSA' }],
    },
    valueGetter: ({ value }) => [value],
    valueSetter: ({ value }) => (value?.length ? value[0] : 'YOOKASSA'),
    defaultValue: 'YOOKASSA',
    label: 'Платежная система',
    disabled: true,
    validators: [Validators.required],
  })
  @column({
    headerName: 'Платежная система',
    valueFormatter: (e) => (Array.isArray(e.value) ? e.value.join(' ') : ''),
  })
  acquiring_operators: string[];

  @frmGroup(YookassaOptions)
  @jsonColumnDesc({
    valueFormatter: (e) => (e.value ? JSON.stringify(e.value, null, 4) : ''),
  })
  yookassa: DTOYookassaOptions;

  @frmControl({
    type: 'json',
    inputs: {
      styles: {
        width: '100%',
        resize: 'vertical',
      },
    },
    valueSetter: ({ value }) => (!value ? {} : value),
  })
  @jsonColumnDesc({
    valueFormatter: (e) => (e.value ? JSON.stringify(e.value, null, 4) : ''),
  })
  meta: any;

  toDTO(): DTOCompanyObject {
    const dto: DTOCompanyObject = {
      ...this,
    };
    return dto;
  }
}

addDTOMapper(CompanyObject);
