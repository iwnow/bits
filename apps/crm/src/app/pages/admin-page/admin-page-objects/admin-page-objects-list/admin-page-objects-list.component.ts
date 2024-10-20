import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FrmsComponent } from 'bits-frms';
import { BGridOptions, BitsGridComponent, columnsFromClass } from 'bits-grid';
import { parseErrorMessage } from 'crm-utils';
import { DialogModule } from 'primeng/dialog';
import { useAdminCommon } from '../../admin-common';
import { DOMAIN } from 'crm-core';
import { uiElements } from 'crm/core/ui-elements';
import { takeUntil } from 'rxjs';
import { mapGridRequest } from 'crm/utils/ag-grid';

@Component({
  selector: 'b-admin-page-objects-list',
  templateUrl: './admin-page-objects-list.component.html',
  styleUrls: ['./admin-page-objects-list.component.css'],
  standalone: true,
  imports: [CommonModule, BitsGridComponent, FrmsComponent, DialogModule],
})
export class AdminPageObjectsListComponent implements OnInit {
  options = this.createGridOption();
  ad = useAdminCommon();

  @ViewChild(BitsGridComponent)
  grid: BitsGridComponent;

  defaultRibbonItems = [
    uiElements.menuItems.createButton({
      command: () => {
        this.toCreateObjectForm();
      },
    }),
  ];

  ngOnInit() {
    this.ad.page.updateRibbonMenu(this.defaultRibbonItems);
    this.ad.destroy$.subscribe(() => {
      this.ad.page.clearRibbonMenu();
    });
  }

  createGridOption(): BGridOptions {
    const opt: BGridOptions = {
      getOptions: () => {
        return {
          columnDefs: columnsFromClass(DOMAIN.CompanyObject),
          rowSelection: 'single',
          onSelectionChanged: () => {
            const selected = this.grid.gapi.getSelectedRows();
            if (selected.length) {
              this.ad.page.updateRibbonMenu([
                ...this.defaultRibbonItems,
                uiElements.menuItems.editButton({
                  command: () => {
                    const objectId = selected[0].id;
                    this.editObject(objectId);
                  },
                }),
              ]);
            } else {
              this.ad.page.updateRibbonMenu(this.defaultRibbonItems);
            }
          },
          onRowDoubleClicked: (e) => {
            const userId = e.node.data.id;
            this.editObject(userId);
          },
          getContextMenuItems: (e) => {
            return [
              {
                name: 'Редактировать',
                icon: uiElements.icons.edit(),
                action: (e) => {
                  const objectId = e.node.data.id;
                  this.editObject(objectId);
                },
              },
              'copy',
            ];
          },
        };
      },
      getRows: (req) => {
        const crmReq = mapGridRequest(req, {
          sort_by: 'id',
          sort_is_desc: true,
        });
        this.ad.crm.server.admin
          .objectList(crmReq)
          .pipe(takeUntil(this.ad.destroy$))
          .subscribe({
            next: (r: any) => {
              req.params.success({
                rowData: r,
                rowCount: r.length,
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

  toCreateObjectForm() {
    this.ad.router.navigate(['../create'], {
      relativeTo: this.ad.route,
    });
  }

  editObject(id: number) {
    this.ad.router.navigate(['../edit', id], {
      relativeTo: this.ad.route,
    });
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
}
