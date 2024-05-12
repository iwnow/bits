import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FrmsComponent } from 'bits-frms';
import { BGridOptions, BitsGridComponent, columnsFromClass } from 'bits-grid';
import { parseErrorMessage } from 'crm-utils';
import { DTOUser } from 'crm/core/dto';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { takeUntil } from 'rxjs';
import { useAdminCommon } from '../../admin-common';
import { uiElements } from 'crm/core/ui-elements';

@Component({
  selector: 'b-admin-page-users-list',
  templateUrl: './admin-page-users-list.component.html',
  styleUrls: ['./admin-page-users-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    BitsGridComponent,
    FrmsComponent,
    DialogModule,
    ButtonModule,
  ],
})
export class AdminPageUsersListComponent implements OnInit {
  options = this.createGridOption();
  ad = useAdminCommon();

  @ViewChild(BitsGridComponent)
  grid: BitsGridComponent;

  defaultRibbonItems = [
    uiElements.menuItems.createButton({
      command: () => {
        this.ad.router.navigate(['../create'], {
          relativeTo: this.ad.route,
        });
      },
    }),
  ];

  ngOnInit() {
    this.ad.page.updateRibbonMenu(this.defaultRibbonItems);
    this.ad.destroy$.subscribe(() => {
      this.ad.page.clearRibbonMenu();
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

  createGridOption(): BGridOptions {
    const opt: BGridOptions = {
      getOptions: () => {
        return {
          columnDefs: columnsFromClass(DTOUser),
          rowSelection: 'single',
          onRowSelected: (e) => {
            const selected = this.grid.gapi.getSelectedRows();
            if (selected.length) {
              this.ad.page.updateRibbonMenu([
                ...this.defaultRibbonItems,
                uiElements.menuItems.editButton({
                  command: () => {
                    this.ad.router.navigate(['../edit'], {
                      relativeTo: this.ad.route,
                      queryParams: {
                        id: selected[0]?.id,
                      },
                    });
                  },
                }),
              ]);
            } else {
              this.ad.page.updateRibbonMenu(this.defaultRibbonItems);
            }
          },
        };
      },
      getRows: (req) => {
        this.ad.crm.server.admin
          .userList({
            skip: req.params.request.startRow || 0,
            limit: req.params.request.endRow,
          })
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
}
