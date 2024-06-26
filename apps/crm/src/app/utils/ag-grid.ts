import type { GetRowsParams } from 'bits-grid';
import { DTO } from 'crm-core';
import { dateUtil } from 'crm-utils';

export function mapGridRequest(
  e: GetRowsParams,
  defaults?: Partial<DTO.DTOListRequest>
): DTO.DTOListRequest {
  const r: DTO.DTOListRequest = {
    ...(defaults || {}),
    limit: e?.params?.request?.endRow,
    skip: e?.params?.request?.startRow || 0,
  };

  // filters
  Object.entries(e?.params?.request?.filterModel || {}).forEach(
    ([field, f]) => {
      r.filters = r.filters || {
        items: [],
        op: 'AND',
      };

      let value = f.filter;

      if (f.filterType === 'date') {
        value = dateUtil(f.dateFrom, 'YYYY-MM-DD HH:mm:ss').toDate(); //'2000-09-17 00:00:00'
      }

      r.filters.items.push({
        key: field,
        value: value,
        op: AG_GRID_TO_CRM_FILTER_TYPES[f.type],
      });
    }
  );

  const sort = (e?.params?.request?.sortModel || [])[0];
  if (sort) {
    r.sort_by = sort.colId;
    r.sort_is_desc = sort.sort === 'desc';
  }

  return r;
}

const AG_GRID_TO_CRM_FILTER_TYPES = {
  empty: 'BLNK',
  equals: 'EQ',
  notEqual: 'NEQ',
  lessThan: 'LT',
  lessThanOrEqual: 'LTEQ',
  greaterThan: 'GT',
  greaterThanOrEqual: 'GTEQ',
  inRange: 'IN',
  notInRange: 'NIN',
  contains: 'CONT',
  notContains: 'NCONT',
  startsWith: 'STRW',
  endsWith: 'ENDW',
  blank: 'BLNK',
  notBlank: 'NBLNK',
};
