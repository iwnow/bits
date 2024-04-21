import { AgGridAngular } from '@ag-grid-community/angular';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import {
  ColDef,
  GridReadyEvent,
  ModuleRegistry,
  ValueFormatterParams,
  GridApi,
  RowModelType,
} from '@ag-grid-community/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { AG_GRID_LOCALE_RU } from './locales/ru';
import { BGridCol, BGridOptions } from './grid.api';
import { OnInit } from '@angular/core';
import { ServerSideRowModelModule } from '@ag-grid-enterprise/server-side-row-model';
import { BehaviorSubject, combineLatest, filter, first, takeUntil } from 'rxjs';
import { maybeObservable, viewDestroy } from 'crm-utils';
import { setAgGridLicense } from './lic-patch';

setAgGridLicense();

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  ServerSideRowModelModule,
]);

@Component({
  selector: 'b-grid',
  standalone: true,
  imports: [CommonModule, AgGridAngular, HttpClientModule],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class BitsGridComponent implements OnInit {
  @Input()
  options: BGridOptions;

  @Input()
  rowModelType: RowModelType = 'serverSide';

  @Output()
  err = new EventEmitter();

  themeClass = 'ag-theme-quartz';
  localeText = AG_GRID_LOCALE_RU;

  rowData = [];
  colDefs: BGridCol[] = [];
  defaultColDef: BGridCol = {};
  initializing$ = new BehaviorSubject(true);
  destroy$ = viewDestroy();
  #gapi$ = new BehaviorSubject<GridApi>(null);
  error = signal(null);
  gapi$ = this.#gapi$.pipe(filter(Boolean));
  get gapi() {
    return this.#gapi$.value;
  }

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    try {
      this.error.set(null);
      combineLatest({
        gapi: this.gapi$,
        options: maybeObservable(this.options.getOptions()),
      })
        .pipe(first(), takeUntil(this.destroy$))
        .subscribe({
          next: ({ options, gapi }) => {
            gapi.updateGridOptions({
              ...options,
              serverSideDatasource: {
                getRows: (params) =>
                  this.options.getRows({
                    params,
                  }),
              },
            });
          },
          error: (err) => {
            this.err.emit(err);
          },
          complete: () => {
            this.initializing$.next(false);
          },
        });
    } catch (err) {
      this.error.set(err);
      this.err.emit(err);
    }
  }

  onGridReady(params: GridReadyEvent) {
    this.#gapi$.next(params.api);
  }
}
