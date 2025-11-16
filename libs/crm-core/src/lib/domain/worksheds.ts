import { dateToISO } from 'crm-utils';
import { DTOPlaceWorkshed, DTOPlaceWorkshedDay } from '../server/dto';

export class PlaceWorkshed {
  place_id: number;
  date_from: Date | number;
  date_to: Date | number;
  data: DTOPlaceWorkshedDay[];
  id?: number;
  section_id?: number;
  created_at?: string;

  toDTO(): DTOPlaceWorkshed {
    const dto: DTOPlaceWorkshed = {
      ...this,
      date_from: dateToISO(this.date_from),
      date_to: dateToISO(this.date_to),
    };
    return dto;
  }

  static fromDTO(dto: DTOPlaceWorkshed): PlaceWorkshed {
    const dom: PlaceWorkshed = Object.assign(new PlaceWorkshed(), {
      ...dto,
      date_from: new Date(dto.date_from),
      date_to: new Date(dto.date_to),
    });
    return dom;
  }
}
