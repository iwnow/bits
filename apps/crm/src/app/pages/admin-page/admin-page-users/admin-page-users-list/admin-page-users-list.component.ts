import { Component, OnInit, inject } from '@angular/core';
import { FrmsComponent, frmControl, frmGroup } from 'bits-frms';
import {
  BGridOptions,
  BitsGridComponent,
  column,
  columnsFromClass,
} from 'bits-grid';
import { CrmClientService } from 'crm-core';
import { parseErrorMessage, viewDestroy } from 'crm-utils';
import { InputTextComponent } from 'crm/components/input-text/input-text.component';
import { MessageService } from 'primeng/api';
import { takeUntil } from 'rxjs';
import { AdminPageService } from '../../admin-page.service';

@Component({
  selector: 'b-admin-page-users-list',
  templateUrl: './admin-page-users-list.component.html',
  styleUrls: ['./admin-page-users-list.component.scss'],
  standalone: true,
  imports: [BitsGridComponent, FrmsComponent],
})
export class AdminPageUsersListComponent implements OnInit {
  crm = inject(CrmClientService);
  msg = inject(MessageService);
  options = this.createGridOption();
  destroy$ = viewDestroy();
  page = inject(AdminPageService);

  userEntity = DTOUser;

  frmComponents = {
    string: {
      type: InputTextComponent,
    },
  };

  ngOnInit() {
    this.page.updateRibbonMenu([
      {
        label: 'Создать',
        icon: 'pi pi-plus',
      },
    ]);
    this.destroy$.subscribe(() => {
      this.page.clearRibbonMenu();
    });
  }

  onError(err) {
    console.error(err);
    const msg = parseErrorMessage(err);
    this.msg.add({
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
        };
      },
      getRows: (req) => {
        this.crm.server.admin
          .userList({
            skip: req.params.request.startRow || 0,
            limit: req.params.request.endRow,
          })
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (rows) => {
              req.params.success({
                rowData: rows,
              });
            },
            error: (err) => {
              req.params.fail();
              const msg = parseErrorMessage(err);
              this.msg.add({
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

@frmGroup()
export class DTOUser {
  @column({
    hide: true,
  })
  id: number;

  @frmControl({ type: 'string' })
  @column({
    headerName: 'Имя',
  })
  name: string;

  @frmControl({ type: 'gender' })
  @column({
    headerName: 'Пол',
  })
  gender?: string;

  @column({
    headerName: 'Фото Id',
    hide: true,
  })
  photo_file_id?: number;

  @frmControl({ type: 'string' })
  @column()
  login: string;

  @frmControl({ type: 'number' })
  @column()
  telegram_id?: number;

  @frmControl({ type: 'boolean' })
  @column({
    headerName: 'Админ',
  })
  is_admin: boolean;

  @column({
    hide: true,
  })
  is_referee: boolean;

  @frmControl({ type: 'date' })
  @column({
    headerName: 'Дата рождения',
  })
  birth_date?: string;

  @frmControl({ type: 'phone' })
  @column({
    headerName: 'Телефон',
  })
  phone?: string;
}
