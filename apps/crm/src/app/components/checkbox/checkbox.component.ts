import {
  Component,
  OnInit,
  computed,
  effect,
  input,
  signal,
} from '@angular/core';
import { FormArray, FormControl, ReactiveFormsModule } from '@angular/forms';
import { FrmsControlBaseComponent } from 'bits-frms';
import { CheckboxModule } from 'primeng/checkbox';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'b-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css'],
  standalone: true,
  imports: [CheckboxModule, ReactiveFormsModule],
})
export class CheckboxComponent
  extends FrmsControlBaseComponent
  implements OnInit
{
  group = input(false);
  options = input([]);
  fa = computed(() => {
    const opts = this.options();
    const value: any[] = this.formControl().value;
    const fa = new FormArray(
      opts.map((i) => new FormControl(value?.includes(i) ?? false))
    );
    return fa;
  });

  setupValuesEffect = effect(() => {
    const fc = this.formControl();
    const fa = this.fa();
    const options = this.options();
    fa.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      const values = [];
      const faValue = fa.value;
      for (let i = 0; i < faValue.length; i++) {
        const checked = faValue[i];
        if (checked) {
          values.push(options[i]);
        }
      }
      fc.patchValue(values);
    });
  });

  ngOnInit(): void {}
}
