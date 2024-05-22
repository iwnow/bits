export class DTOListRequest {
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

export class DTOListResult<T> {
  data: T[];
  total: number;
}
