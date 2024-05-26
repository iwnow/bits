import { Directive, input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { useDestroyStream } from 'crm-core';

@Directive()
export class FrmsControlBaseComponent {
  formControl = input<FormControl>(null);

  placeholder = input('');

  destroy$ = useDestroyStream();
}
