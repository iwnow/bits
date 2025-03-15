import { Component, computed, inject, input, OnInit } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { CrmClientService } from 'crm-core';
import { filter, of, switchMap } from 'rxjs';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'b-company-places-menu',
  templateUrl: './company-places-menu.component.html',
  styleUrls: ['./company-places-menu.component.css'],
  standalone: true,
  imports: [MenuModule],
})
export class CompanyPlacesMenuComponent implements OnInit {
  crm = inject(CrmClientService);

  companyId = input.required<number>();
  placeLinkGetter = input<(place: any) => string>((p) => p?.id);

  objects$ = toObservable(this.companyId).pipe(
    filter(Boolean),
    switchMap((cid) => this.crm.company.selectCompanyObjects(cid))
  );
  objects = toSignal(this.objects$);
  menuItems = computed(() => {
    const objects = this.objects() || [];
    const linkGetter = this.placeLinkGetter();
    return objects.map((o) => {
      return {
        label: o.name,
        items: o.places.map((p) => {
          return {
            label: p.name,
            routerLink: linkGetter?.(p),
          };
        }),
      };
    });
  });

  ngOnInit() {}
}
