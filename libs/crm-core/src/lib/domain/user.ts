import { Validators } from '@angular/forms';
import { frmControl, frmGroup } from 'bits-frms';
import { column } from 'bits-grid';
import { DTOUser } from '../server/dto';
import { dateUtil } from 'crm-utils';
import { addDTOMapper } from './to-dto';

@frmGroup()
export class User implements Omit<DTOUser, 'birth_date'> {
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
    filter: 'agTextColumnFilter',
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
    filter: 'agTextColumnFilter',
  })
  telegram_id?: number;

  @frmControl({ type: 'checkbox', label: 'Админ' })
  @column({
    headerName: 'Админ',
    valueFormatter: (e) => {
      if (typeof e.value !== 'boolean') {
        return '';
      }
      return e.value ? '💎' : '';
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
    filter: 'agDateColumnFilter',
  })
  birth_date?: Date;

  @frmControl({ type: 'phone', label: 'Телефон' })
  @column({
    headerName: 'Телефон',
    filter: 'agTextColumnFilter',
  })
  phone?: string;

  @frmControl({ type: 'checkbox', label: 'Активен' })
  @column({
    headerName: 'Активен',
    valueFormatter: (e) => {
      if (typeof e.value !== 'boolean') {
        return '';
      }
      return e.value ? '🟢' : '🔴';
    },
  })
  is_active?: boolean;

  toDTO(): DTOUser {
    const user: DTOUser = {
      ...this,
      birth_date: this.birth_date
        ? dateUtil(this.birth_date).format('YYYY-MM-DD')
        : undefined,
      phone: this.phone ? this.phone.replace(/\D/g, '') : undefined,
    };
    return user;
  }
}

addDTOMapper(User);
