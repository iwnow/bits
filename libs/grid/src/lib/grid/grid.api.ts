import {
  ColDef,
  ColGroupDef,
  GridOptions,
  IServerSideGetRowsParams,
} from '@ag-grid-community/core';
import { MaybeAsync } from 'crm-utils';

export interface BGridOptions {
  getOptions(context?: any): MaybeAsync<GridOptions>;
  getRows(params: GetRowsParams): void;
}

export interface BGridCol extends ColDef, Partial<ColGroupDef> {
  data?: any;
}

export type GetRowsParams = {
  params: IServerSideGetRowsParams;
  context?: any;
};
