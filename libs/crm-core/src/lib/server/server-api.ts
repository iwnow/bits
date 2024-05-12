export interface ListRequest {
  skip: number;
  limit: number;
  sort_by?: string;
  sort_is_desc?: boolean;
  filters?: {
    items: Array<{
      key: string;
      op?: 'EQ';
      value: string | number | boolean;
      custom_op?: string;
    }>;
    op: 'AND' | 'OR';
  };
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
  password?: string;
}

export interface ListResult<T> {
  data: T[];
  total: number;
}
