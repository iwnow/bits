import { FrmComponents } from 'bits-frms';
import { CheckboxComponent } from 'crm/components/checkbox/checkbox.component';
import { DateComponent } from 'crm/components/date/date.component';
import { GenderComponent } from 'crm/components/gender/gender.component';
import { InputTextComponent } from 'crm/components/input-text/input-text.component';
import { JsonComponent } from 'crm/components/json/json.component';
import { NumberComponent } from 'crm/components/number/number.component';
import { PhoneComponent } from 'crm/components/phone/phone.component';
import { SelectComponent } from 'crm/components/select/select.component';

export const crmFrmComponents: FrmComponents = {
  string: {
    type: InputTextComponent,
  },
  gender: {
    type: GenderComponent,
  },
  checkbox: {
    type: CheckboxComponent,
    options: {
      valueGetter: ({ value }) => {
        return !!value;
      },
    },
  },
  groupCheckbox: {
    type: CheckboxComponent,
    inputs: {
      group: true,
    },
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
  select: {
    type: SelectComponent,
  },
  json: {
    type: JsonComponent,
  },
};
