import {
  DTOAddressCity,
  DTOAddressDistrict,
  DTOAddressInfo,
} from './address-info';
import { DTOCompany } from './company';

export interface DTOCompanyUserObject {
  company_user: number;
  object_id: number;
  rights: string[];
  id: number;
}

export interface DTOCompanyObject {
  id: number;
  address_info: DTOAddressInfo;
  name: string;
  city: DTOAddressCity;
  district: DTOAddressDistrict;
  places: DTOPlace[];
  address?: string;
  rights?: string[];
  city_id?: number;
  company_id?: number;
  district_id?: number;
  company?: DTOCompany;
  acquiring_operators?: string[];
  yookassa?: DTOYookassaOptions;
  meta?: any;
}

export interface DTOPlace {
  id: number;
  name: string;
  photo_file_id: number;
  url: string;
  cover: DTOPlaceCover;
  cover_id: number;
  object?: DTOCompanyObject;
  is_sectioned?: boolean;
  section_columns: number;
  section_rows: number;
  sections: DTOPlaceSection[];
  cameras?: Array<{
    url: string;
    name: string;
  }>;
  dimension_height?: number;
  dimension_length?: number;
  dimension_width?: number;
}

export interface DTOPlaceCover {
  name: string;
  id: number;
}

export interface DTOPlaceSection {
  id: number;
  column_end: number;
  column_start: number;
  name: string;
  row_end: number;
  row_start: number;
}

export function sectionName(section: DTOPlaceSection) {
  return `${section.name} (к[${section.column_start}:${section.column_end}], c[${section.row_start}:${section.row_end}])`;
}

export interface DTOYookassaOptions {
  is_captured: boolean;
  is_with_receipt: boolean;
  shop_id: number;
  vat_code: number;
}
