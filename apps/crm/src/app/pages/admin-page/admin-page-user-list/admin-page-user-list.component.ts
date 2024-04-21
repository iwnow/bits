import { Component, OnInit, inject } from '@angular/core';
import { CrmClientService } from 'crm-core';
import { BGridOptions, BitsGridComponent } from 'bits-grid';
import { parseErrorMessage, viewDestroy } from 'crm-utils';
import { MessageService } from 'primeng/api';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'b-admin-page-user-list',
  templateUrl: './admin-page-user-list.component.html',
  styleUrls: ['./admin-page-user-list.component.css'],
  standalone: true,
  imports: [BitsGridComponent],
})
export class AdminPageUserListComponent implements OnInit {
  crm = inject(CrmClientService);
  msg = inject(MessageService);
  options = this.createGridOption();
  destroy$ = viewDestroy();

  ngOnInit() {}

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
          columnDefs: fieldsFromClass(DTOUser),
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

const symFields = Symbol();
export function field() {
  return (ctor, field) => {
    ctor[symFields] = ctor[symFields] || {
      fields: [],
    };
    const fields = ctor[symFields].fields;
    fields.push({
      field,
    });
  };
}

export function fieldsFromClass(type: any) {
  const proto = type?.prototype;
  if (!proto[symFields]) {
    return [];
  }
  const fields = proto[symFields].fields;
  return fields;
}

export class DTOUser {
  @field()
  id: number;

  @field()
  name: string;
  @field()
  gender?: string;
  @field()
  photo_file_id?: number;
  @field()
  login: string;
  @field()
  telegram_id?: number;
  @field()
  is_admin: boolean;
  @field()
  is_referee: boolean;
  @field()
  birth_date?: string;
  @field()
  phone?: string;
}
