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
import { ItemsLoader, useItemsLoaderFactory } from 'crm-core';
import { maybePromise } from 'crm-utils';
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
  visibleOptions = signal([]);
  itemsLoader = input<ItemsLoader>(null);
  labelMapper = input<(o: any) => string>(null);
  fa = computed(() => {
    const opts = this.visibleOptions();
    const value: any[] = this.formControl().value;
    const fa = new FormArray(
      opts.map((i) => new FormControl(value?.includes(i) ?? false))
    );
    return fa;
  });

  setupValuesEffect = effect(() => {
    const fc = this.formControl();
    const fa = this.fa();
    const options = this.visibleOptions();
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

  loaderFactory = useItemsLoaderFactory();

  ngOnInit(): void {
    const loader = this.itemsLoader();
    this.visibleOptions.set(this.options() || []);
    if (loader) {
      this.visibleOptions.set([]);
      maybePromise(this.loaderFactory.run(loader)).then((res) => {
        const mapper = this.labelMapper();
        if (Array.isArray(res.data)) {
          this.visibleOptions.set(
            res.data.map((i) => (mapper ? mapper(i) : i))
          );
        }
      });
    }
  }
}
