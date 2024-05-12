import { CheckboxComponent } from 'crm/components/checkbox/checkbox.component';
import { DateComponent } from 'crm/components/date/date.component';
import { GenderComponent } from 'crm/components/gender/gender.component';
import { InputTextComponent } from 'crm/components/input-text/input-text.component';
import { NumberComponent } from 'crm/components/number/number.component';
import { PhoneComponent } from 'crm/components/phone/phone.component';

export const crmFrmComponents = {
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
