import {
  Component,
  computed,
  inject,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { CrmClientService } from 'crm-core';
import { MenuModule } from 'primeng/menu';
import { filter, switchMap, tap } from 'rxjs';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'b-company-places-menu',
  templateUrl: './company-places-menu.component.html',
  styleUrls: ['./company-places-menu.component.css'],
  standalone: true,
  imports: [MenuModule, DropdownModule, FormsModule],
})
export class CompanyPlacesMenuComponent implements OnInit {
  crm = inject(CrmClientService);
  router = inject(Router);

  companyId = input.required<number>();
  placeId = input<number>();
  placeLinkGetter = input<(place: any) => string>(null);
  viewMode = input<'combo' | 'menu'>('menu');
  selectPlace = output<any>();
  initPlaceIdGetter = input<() => number>();
  initPlaceId = signal<number>(-1);

  setupInitSelect = false;
  readyInit = false;
  objects$ = toObservable(this.companyId).pipe(
    filter(Boolean),
    switchMap((cid) => this.crm.company.selectCompanyObjects(cid)),
    tap(() => {
      this.readyInit = true;
    })
  );
  objects = toSignal(this.objects$);
  menuItems = computed(() => {
    const objects = this.objects() || [];
    const linkGetter = this.placeLinkGetter();
    const initPlaceId = this.initPlaceId();
    const places = [];
    const items = objects.map((o) => {
      return {
        data: o,
        label: o.name,
        items: o.places.map((p) => {
          places.push(p);
          const item = {
            data: p,
            label: p.name,
            routerLink: linkGetter?.(p),
          };
          if (
            !this.setupInitSelect &&
            this.readyInit &&
            initPlaceId &&
            p.id === initPlaceId
          ) {
            this.selectedPlace = item;
          }
          return item;
        }),
      };
    });
    if (!this.setupInitSelect && this.readyInit && !this.selectedPlace) {
      this.selectedPlace = places[0];
    }
    if (!this.setupInitSelect && this.readyInit) {
      this.onPlaceChange({ init: true });
    }
    return items;
  });
  selectedPlace = null;
  groupedPlaces = computed(() => {
    const menu = this.menuItems();
    return menu;
  });

  ngOnInit() {
    const initPlaceIdGetter = this.initPlaceIdGetter();
    const initPlaceId = initPlaceIdGetter();
    this.initPlaceId.set(initPlaceId);
  }

  onPlaceChange(e) {
    this.selectPlace.emit({ place: this.selectedPlace });
    const linkGetter = this.placeLinkGetter();
    if (this.selectedPlace && linkGetter) {
      const link = linkGetter(this.selectedPlace.data);
      this.router.navigate([link]);
    }
  }
}
