import type { GetRowsParams } from 'bits-grid';
import type { CrmServerApi } from 'crm-core';
import { dateUtil } from 'crm-utils';

export function mapGridRequest(e: GetRowsParams): CrmServerApi.ListRequest {
  const r: CrmServerApi.ListRequest = {
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
