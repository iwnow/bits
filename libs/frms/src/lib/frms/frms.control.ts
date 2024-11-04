import { Directive, inject, Injector, input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { useDestroyStream } from 'crm-core';

@Directive()
export class FrmsControlBaseComponent {
  formControl = input<FormControl>(null);
  placeholder = input('');
  disabled = input(false);
  styles = input<any>({ minWidth: '200px' });
  destroy$ = useDestroyStream();
  inj = inject(Injector);
}
