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
import { CompanyObject } from './object';

@frmGroup()
export class CompanyPlace {
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

  @column({
    headerName: 'Обьект',
    field: 'object.name',
  })
  object: Partial<CompanyObject>;

  @column()
  @frmControl({
    type: 'number',
    label: 'FindSport Id',
  })
  fs_id: number;

  @column({
    valueFormatter: (e) => {
      if (typeof e.value !== 'boolean') {
        return '';
      }
      return e.value ? '❌' : '';
    },
  })
  @frmControl({
    type: 'checkbox',
    label: 'Удален',
  })
  is_deleted: boolean;

  @column({
    valueFormatter: (e) => {
      if (typeof e.value !== 'boolean') {
        return '';
      }
      return e.value ? '✅' : '';
    },
  })
  @frmControl({
    type: 'checkbox',
    label: 'Секции',
  })
  is_sectioned: boolean;

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

  @frmControl({
    type: 'string',
  })
  @column()
  url = '';

  cover: any;

  toDTO(): DTOPlace {
    const dto: DTOPlace = {
      ...this,
    };
    return dto;
  }
}

addDTOMapper(CompanyObject);
