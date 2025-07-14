import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  inject,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { FrmsComponent } from 'bits-frms';
import { BGridOptions, BitsGridComponent, columnsFromClass } from 'bits-grid';
import { useAdminCommon } from '../../admin-common';
import { DOMAIN } from 'crm-core';
import { parseErrorMessage } from 'crm-utils';
import { uiElements } from 'crm/core/ui-elements';
import { mapGridRequest } from 'crm/utils/ag-grid';
import { takeUntil } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'b-tariffs-list-search',
  templateUrl: './tariffs-list-search.component.html',
  styleUrls: ['./tariffs-list-search.component.scss'],
  standalone: true,
  imports: [CommonModule, BitsGridComponent, FrmsComponent, ButtonModule],
})
export class TariffsListSearchComponent {
  options = this.createGridOption();
  ad = useAdminCommon();
  grid = viewChild(BitsGridComponent);
  dialogRef = inject(DynamicDialogRef, { optional: true });
  tariffs = signal<any[]>([]);
  selectedRows = signal([]);
  hasSelected = computed(() => {
    return this.selectedRows()?.length > 0;
  });

  createGridOption(): BGridOptions {
    const opt: BGridOptions = {
      getOptions: () => {
        return {
          columnDefs: columnsFromClass(DOMAIN.CompanyTariff).map((i) => {
            return {
              ...i,
              menuTabs: [],
              suppressHeaderContextMenu: true,
              suppressHeaderMenuButton: true,
            };
          }),
          rowSelection: {
            mode: 'multiRow',
            checkboxes: true,
            headerCheckbox: false,
          },
          suppressContextMenu: true,
          suppressCellFocus: true,
          onSelectionChanged: () => {
            const selected = this.grid().gapi.getSelectedRows();
            if (selected.length) {
              this.selectedRows.set(selected);
            } else {
              this.selectedRows.set([]);
            }
          },
          onRowDoubleClicked: (e) => {
            const userId = e.node.data.id;
          },
          getContextMenuItems: (e) => {
            return [];
          },
        };
      },
      getRows: (req) => {
        const crmReq = mapGridRequest(req, {
          sort_by: 'id',
          sort_is_desc: true,
        });
        this.ad.crm.server.admin
          .tariffList(crmReq)
          .pipe(takeUntil(this.ad.destroy$))
          .subscribe({
            next: (r) => {
              req.params.success({
                rowData: r.data,
                rowCount: r.total,
              });
            },
            error: (err) => {
              req.params.fail();
              const msg = parseErrorMessage(err);
              this.ad.msg.add({
                severity: 'error',
                summary: 'Ошибка',
                detail: msg,
              });
            },
          });
      },
    };
    return opt;
  }

  onError(err) {
    console.error(err);
    const msg = parseErrorMessage(err);
    this.ad.msg.add({
      severity: 'error',
      summary: 'Ошибка',
      detail: msg,
    });
  }

  onCancel() {
    this.dialogRef?.close();
  }

  onAdd() {
    const selected = this.selectedRows();
    this.dialogRef?.close({ tariffs: selected });
  }
}
