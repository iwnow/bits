import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import {
  ModuleRegistry,
  CellValueChangedEvent,
  ColDef,
  GridReadyEvent,
  ICellRendererParams,
  SelectionChangedEvent,
  ValueFormatterParams,
} from '@ag-grid-community/core';
import {
  AgGridAngular,
  ICellRendererAngularComp,
} from '@ag-grid-community/angular';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AG_GRID_LOCALE_RU } from './locales/ru';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

@Component({
  selector: 'b-grid',
  standalone: true,
  imports: [CommonModule, AgGridAngular, HttpClientModule],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class BitsGridComponent {
  themeClass = 'ag-theme-quartz';
  localeText = AG_GRID_LOCALE_RU;

  // Return formatted date value
  dateFormatter(params: ValueFormatterParams) {
    return new Date(params.value).toLocaleDateString('ru-RU', {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  // Row Data: The data to be displayed.
  rowData: IRow[] = [];

  // Column Definitions: Defines & controls grid columns.
  colDefs: ColDef[] = [
    {
      field: 'mission',
      headerName: 'Миссия',
      width: 150,
      checkboxSelection: true,
    },
    {
      field: 'company',
      headerName: 'Компания',
      width: 130,
      cellRenderer: CompanyLogoRenderer,
    },
    {
      field: 'location',
      headerName: 'Локация',
      width: 225,
    },
    {
      field: 'date',
      headerName: 'Дата',
      valueFormatter: this.dateFormatter,
    },
    {
      field: 'price',
      headerName: 'Цена',
      width: 130,
      valueFormatter: (params) => {
        return '£' + params.value.toLocaleString();
      },
    },
    {
      field: 'successful',
      headerName: 'Удачно',
      width: 120,
      cellRenderer: MissionResultRenderer,
    },
    { field: 'rocket', headerName: 'Ракета', },
  ];

  // Default Column Definitions: Apply configuration across all columns
  defaultColDef: ColDef = {
    filter: true, // Enable filtering on all columns
    editable: true, // Enable editing on all columns
  };

  // Load data into grid when ready
  constructor(private http: HttpClient) {}
  onGridReady(params: GridReadyEvent) {
    this.http
      .get<any[]>(
        'https://www.ag-grid.com/example-assets/space-mission-data.json'
      )
      .subscribe((data) => (this.rowData = data));
  }

  // Handle row selection changed event
  onSelectionChanged = (event: SelectionChangedEvent) => {
    console.log('Row Selected!');
  };

  // Handle cell editing event
  onCellValueChanged = (event: CellValueChangedEvent) => {
    console.log(`New Cell Value: ${event.value}`);
  };
}

// Row Data Interface
interface IRow {
  mission: string;
  company: string;
  location: string;
  date: string;
  time: string;
  rocket: string;
  price: number;
  successful: boolean;
}

// Custom Cell Renderer Component
@Component({
  selector: 'b-mission-result-renderer',
  standalone: true,
  imports: [NgIf],
  template: `
    <span *ngIf="value">
      <img
        [alt]="value"
        [src]="'https://www.ag-grid.com/example-assets/icons/' + value + '.png'"
        [height]="30"
      />
    </span>
  `,
  styles: [
    'img { width: auto; height: auto; } span {display: flex; height: 100%; justify-content: center; align-items: center} ',
  ],
})
export class MissionResultRenderer implements ICellRendererAngularComp {
  // Init Cell Value
  public value!: string;
  agInit(params: ICellRendererParams): void {
    this.value = params.value ? 'tick-in-circle' : 'cross-in-circle';
  }

  // Return Cell Value
  refresh(params: ICellRendererParams): boolean {
    this.value = params.value;
    return true;
  }
}

// Custom Cell Renderer Component
@Component({
  selector: 'b-company-logo-renderer',
  standalone: true,
  imports: [NgIf],
  template: `
    <span *ngIf="value">
      <img
        [alt]="value"
        [src]="
          'https://www.ag-grid.com/example-assets/space-company-logos/' +
          value.toLowerCase() +
          '.png'
        "
        [height]="30"
      />
      <p>{{ value }}</p>
    </span>
  `,
  styles: [
    'img {display: block; width: 25px; height: auto; max-height: 50%; margin-right: 12px; filter: brightness(1.1);} span {display: flex; height: 100%; width: 100%; align-items: center} p { text-overflow: ellipsis; overflow: hidden; white-space: nowrap }',
  ],
})
export class CompanyLogoRenderer implements ICellRendererAngularComp {
  // Init Cell Value
  public value!: string;
  agInit(params: ICellRendererParams): void {
    this.value = params.value;
  }

  // Return Cell Value
  refresh(params: ICellRendererParams): boolean {
    this.value = params.value;
    return true;
  }
}
