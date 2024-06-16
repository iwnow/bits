export interface DTOCompanyUserObject {
  company_user: number;
  object_id: number;
  rights: string[];
  id: number;
}

export interface ICompanyObject {
  id: number;
  address: string;
  name: string;
  city: ICity;
  district: ICityDistrict;
  places: IPlace[];
  rights?: string[];

  city_id: number;
  company_id: number;
  district_id: number;
}

export interface ICity {
  name: string;
  tzone: string;
  id: number;
}

export interface ICityDistrict {
  name: string;
  id: number;
  city_id: number;
}

export interface IPlace {
  id: number;
  name: string;
  photo_file_id: number;
  url: string;
  cover: IPlaceCover;
  cover_id: number;
  object?: ICompanyObject;
  is_sectioned?: boolean;
  section_columns: number;
  section_rows: number;
  sections: IPlaceSection[];
  cameras?: Array<{
    url: string;
    name: string;
  }>;
  dimension_height?: number;
  dimension_length?: number;
  dimension_width?: number;
}

export interface IPlaceCover {
  name: string;
  id: number;
}

export interface IPlaceSection {
  id: number;
  column_end: number;
  column_start: number;
  name: string;
  row_end: number;
  row_start: number;
}

export function sectionName(section: IPlaceSection) {
  return `${section.name} (к[${section.column_start}:${section.column_end}], c[${section.row_start}:${section.row_end}])`;
}
