import {
  ChangeDetectionStrategy,
  Component,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FrmsControlBaseComponent } from 'bits-frms';
import {
  ItemsLoader,
  ItemsLoaderFactory,
  useItemsLoaderFactory,
} from 'crm-core';
import { maybePromise } from 'crm-utils';
import { ScrollerOptions, SelectItem } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { delay, takeUntil } from 'rxjs';

@Component({
  selector: 'b-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, DropdownModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent
  extends FrmsControlBaseComponent
  implements OnInit
{
  items = input<SelectItem[]>([]);
  itemsLoader = input<ItemsLoader>(null);
  valueField = input<string>(undefined);
  textField = input('text');
  clearable = input(true);
  allItems = signal([]);
  options: ScrollerOptions = {
    delay: 250,
    showLoader: false,
    lazy: true,
    onLazyLoad: this.onLazyLoad.bind(this),
  };
  loaderFactory = useItemsLoaderFactory();
  itemsLoaderArgs = input<Array<{ context: string; getter: string }>>([]);
  refreshControlOnChange = input<string>();
  initValueAfterItemsLoaderById = input<boolean | string>(false);
  initValueAfterItemsLoaderByIdDone = false;

  ngOnInit(): void {
    this.allItems.set(this.items() || []);
    this.refresh();
    if (this.refreshControlOnChange()) {
      this.formControl()
        .parent.get(this.refreshControlOnChange())
        .valueChanges.pipe(delay(1), takeUntil(this.destroy$))
        .subscribe(() => {
          this.refresh();
        });
    }
  }

  onLazyLoad(e) {}

  refresh() {
    const loader = this.itemsLoader();
    if (loader) {
      const args = this.getItemsLoadersAgrs();
      maybePromise(this.loaderFactory.run(loader, ...args)).then((res) => {
        if (res.data) {
          this.allItems.set(res.data);
          const initValueAfterItemsLoaderById =
            this.initValueAfterItemsLoaderById();
          if (
            initValueAfterItemsLoaderById &&
            !this.initValueAfterItemsLoaderByIdDone
          ) {
            this.initValueAfterItemsLoaderByIdDone = true;
            const key =
              typeof initValueAfterItemsLoaderById === 'string'
                ? initValueAfterItemsLoaderById
                : 'id';
            const ctrlCtx = this.formControl().value || this.formControl().parent?.value;
            const ctrlValueId = ctrlCtx?.[key];
            if (ctrlValueId) {
              const value = res.data.find((i) => (i[key] || i.id) === ctrlValueId);
              if (value) {
                this.formControl().setValue(value, { emitEvent: false });
              }
            }
          }
        }
      });
    }
  }

  getItemsLoadersAgrs() {
    const getContext = (ctx: string) => {
      if (ctx?.toLowerCase() === 'thisFormGroup'.toLowerCase()) {
        return this.formControl().parent.value;
      }
    };
    const args = this.itemsLoaderArgs().map((desc) => {
      const context = getContext(desc.context);
      const value = desc.getter
        .split('.')
        .reduce((o, key) => o?.[key], context);
      return value;
    });
    return args;
  }
}
