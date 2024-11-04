import {
  ChangeDetectionStrategy,
  Component,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FrmsControlBaseComponent } from 'bits-frms';
import { ItemsLoader, ItemsLoaderFactory } from 'crm-core';
import { maybePromise } from 'crm-utils';
import { ScrollerOptions, SelectItem } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';

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
    showLoader: true,
    lazy: true,
    onLazyLoad: this.onLazyLoad.bind(this),
  };
  loaderFactory = this.inj.get(ItemsLoaderFactory);

  ngOnInit(): void {
    this.allItems.set(this.items() || []);
    const loader = this.itemsLoader();
    maybePromise(this.loaderFactory.run(loader)).then((res) => {
      if (res.data) {
        this.allItems.set(res.data);
      }
    });
  }

  onLazyLoad(e) {}
}
