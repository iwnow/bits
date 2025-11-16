export interface DTOAddressInfo {
  address: string;
  city: DTOAddressCity;
  district: DTOAddressDistrict;
  district_id?: number;
}

export interface DTOAddressCity {
  id: number;
  name: string;
  tzone: string;
  country?: DTOAddressCountry;
  districts?: DTOAddressDistrict[];
}

export interface DTOAddressDistrict {
  name: string;
  id: number;
  city_id?: number;
}

export interface DTOAddressCountry {
  name: string;
  id: number;
}

