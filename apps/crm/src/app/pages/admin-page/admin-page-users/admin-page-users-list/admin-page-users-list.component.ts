import { Component, OnInit, ViewChild, inject, signal } from '@angular/core';
import { FrmsComponent, frmControl, frmGroup } from 'bits-frms';
import {
  BGridOptions,
  BitsGridComponent,
  column,
  columnsFromClass,
} from 'bits-grid';
import { CrmClientService } from 'crm-core';
import { dateUtil, parseErrorMessage, viewDestroy } from 'crm-utils';
import { CheckboxComponent } from 'crm/components/checkbox/checkbox.component';
import { DateComponent } from 'crm/components/date/date.component';
import { GenderComponent } from 'crm/components/gender/gender.component';
import { InputTextComponent } from 'crm/components/input-text/input-text.component';
import { NumberComponent } from 'crm/components/number/number.component';
import { PhoneComponent } from 'crm/components/phone/phone.component';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { takeUntil } from 'rxjs';
import { AdminPageService } from '../../admin-page.service';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

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
  crm = inject(CrmClientService);
  msg = inject(MessageService);
  options = this.createGridOption();
  destroy$ = viewDestroy();
  page = inject(AdminPageService);

  userEntity = DTOUser;
  userCreateModal = signal(false);

  frmComponents = {
    string: {
      type: InputTextComponent,
    },
    gender: {
      type: GenderComponent,
    },
    checkbox: {
      type: CheckboxComponent,
    },
    number: {
      type: NumberComponent,
    },
    date: {
      type: DateComponent,
    },
    phone: {
      type: PhoneComponent,
    },
  };

  @ViewChild(BitsGridComponent)
  grid: BitsGridComponent;

  ngOnInit() {
    this.page.updateRibbonMenu([
      {
        label: 'Создать',
        icon: 'pi pi-plus',
        command: () => {
          this.userCreateModal.set(true);
        },
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
            next: (r) => {
              req.params.success({
                rowData: r.data,
                rowCount: r.total,
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

  onUserCreate(user: DTOUser) {
    this.userCreateModal.set(false);
    user.birth_date = user.birth_date
      ? dateUtil(user.birth_date).format('YYYY-MM-DD')
      : undefined;
    user.is_admin = !!user.is_admin;
    user.phone = user.phone ? user.phone.replace(/\D/g, '') : null;

    this.crm.server.admin.createUser(user).subscribe({
      next: () => {
        this.grid.refresh();
      },
      error: (err) => {
        const message = parseErrorMessage(err);
        this.msg.add({
          severity: 'error',
          summary: 'Ошибка создания пользователя',
          detail: message,
        });
      },
    });
  }
}

@frmGroup()
export class DTOUser {
  @column({
    hide: true,
  })
  id: number;

  @frmControl({ type: 'string', label: 'Имя' })
  @column({
    headerName: 'Имя',
  })
  name: string;

  @frmControl({ type: 'gender', label: 'Пол' })
  @column({
    headerName: 'Пол',
  })
  gender?: string;

  @column({
    headerName: 'Фото Id',
    hide: true,
  })
  photo_file_id?: number;

  @frmControl({ type: 'string', label: 'Логин' })
  @column()
  login: string;

  @frmControl({ type: 'string', label: 'Пароль' })
  password: string;

  @frmControl({
    type: 'number',
    label: 'Telegram Id',
    inputs: {
      inputId: 'withoutgrouping',
      useGrouping: false,
    },
  })
  @column({
    headerName: 'Telegram Id',
  })
  telegram_id?: number;

  @frmControl({ type: 'checkbox', label: 'Админ' })
  @column({
    headerName: 'Админ',
  })
  is_admin: boolean;

  @column({
    hide: true,
  })
  is_referee: boolean;

  @frmControl({ type: 'date', label: 'Дата рождения' })
  @column({
    headerName: 'Дата рождения',
  })
  birth_date?: string;

  @frmControl({ type: 'phone', label: 'Телефон' })
  @column({
    headerName: 'Телефон',
  })
  phone?: string;
}
