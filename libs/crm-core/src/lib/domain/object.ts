import { Validators } from '@angular/forms';
import { frmControl, frmGroup } from 'bits-frms';
import { column } from 'bits-grid';
import {
  DTOCity,
  DTOCityDistrict,
  DTOCompanyObject,
  DTOPlace,
} from '../server/dto';
import { dateUtil } from 'crm-utils';
import { addDTOMapper } from './to-dto';
import { City } from './city';

@frmGroup()
export class CompanyObject
  implements Omit<DTOCompanyObject, 'city_id' | 'company_id' | 'district_id'>
{
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

  @frmControl({
    type: 'string',
    label: 'Адрес',
    validators: [Validators.required],
  })
  @column({
    headerName: 'Адрес',
    filter: 'agTextColumnFilter',
  })
  address: string;

  @frmGroup(City)
  @column({
    headerName: 'Город',
    children: [
      { headerName: 'Название', field: 'city.name' },
      { headerName: 'Таймзона', field: 'city.tzone' },
    ],
  })
  city: DTOCity;

  @column({
    headerName: 'Район',
    field: 'district.name',
  })
  district: DTOCityDistrict;

  places: DTOPlace[];

  rights?: string[];

  toDTO(): DTOCompanyObject {
    const dto: DTOCompanyObject = {
      ...this,
    };
    return dto;
  }
}

addDTOMapper(CompanyObject);
