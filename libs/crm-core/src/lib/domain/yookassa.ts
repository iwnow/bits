import { frmControl, frmGroup } from 'bits-frms';
import { DTOYookassaOptions } from '../server/dto';
import { Validators } from '@angular/forms';
import { arrayFill } from 'crm-utils';

@frmGroup()
export class YookassaOptions implements DTOYookassaOptions {
  @frmControl({ type: 'checkbox' })
  is_captured: boolean;

  @frmControl({ type: 'checkbox' })
  is_with_receipt: boolean;

  @frmControl({ type: 'number', validators: [Validators.required] })
  shop_id: number;

  @frmControl({
    type: 'select',
    inputs: {
      valueField: 'id',
      textField: 'id',
      items: arrayFill(6).map((i) => ({ id: i })),
    },
    defaultValue: 1,
    validators: [Validators.required],
  })
  vat_code: number;
}
