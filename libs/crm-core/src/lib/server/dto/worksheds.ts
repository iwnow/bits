export interface DTOPlaceWorkshed {
  place_id: number;
  date_from: string;
  date_to: string;
  data: DTOPlaceWorkshedDay[];
  id?: number;
  section_id?: number;
  created_at?: string;
}

export interface DTOPlaceWorkshedDay {
  /** */
  day: number;
  /**'09:00' */
  start: string;
  /**'18:00' */
  end: string;
}
