import { Validators } from '@angular/forms';
import { frmControl, frmGroup } from 'bits-frms';
import { column } from 'bits-grid';

@frmGroup()
export class DTOUser {
  @column({
    hide: true,
  })
  id: number;

  @frmControl({
    type: 'string',
    label: 'Имя',
    validators: [Validators.required],
  })
  @column({
    headerName: 'Имя',
  })
  name: string;

  @frmControl({ type: 'gender', label: 'Пол' })
  @column({
    headerName: 'Пол',
    valueFormatter: (e) => {
      if (typeof e.value !== 'boolean') {
        return '';
      }
      return e.value ? 'Мужской' : 'Женский';
    },
  })
  gender?: any;

  @column({
    headerName: 'Фото Id',
    hide: true,
  })
  photo_file_id?: number;

  @frmControl({
    type: 'string',
    label: 'Логин',
    validators: [Validators.required],
  })
  @column()
  login: string;

  @frmControl({
    type: 'string',
    label: 'Пароль',
    validators: [Validators.required],
  })
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
    valueFormatter: (e) => {
      if (typeof e.value !== 'boolean') {
        return '';
      }
      return e.value ? '✅' : '';
    },
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
  birth_date?: any;

  @frmControl({ type: 'phone', label: 'Телефон' })
  @column({
    headerName: 'Телефон',
  })
  phone?: string;
}
