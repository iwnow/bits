export interface ListRequest {
  skip: number;
  limit: number;
}
export interface SearchListRequest extends ListRequest {
  q?: string;
}

export interface User {
  id: number;
  name: string;
  gender?: string;
  photo_file_id?: number;
  login: string;
  telegram_id?: number;
  is_admin: boolean;
  is_referee: boolean;
  birth_date?: string;
  phone?: string;
}
