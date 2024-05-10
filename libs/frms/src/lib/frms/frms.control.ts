import { Directive, input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Directive()
export class FrmsControlBaseComponent {
  formControl = input<FormControl>(null);

  placeholder = input('');
}
