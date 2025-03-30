import { Component, HostBinding, inject, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CrmClientService } from 'crm-core';
import { CompanyPlacesMenuComponent } from 'crm/components/company-places-menu';
import { RibbonBarComponent } from 'crm/layout/ribbon-bar/ribbon-bar.component';
import { map } from 'rxjs';

@Component({
  selector: 'b-calendar-page',
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.scss'],
  standalone: true,
  imports: [RouterModule, CompanyPlacesMenuComponent, RibbonBarComponent],
  host: {
    class: 'content-page content-page-full-h',
  },
})
export class CalendarPageComponent implements OnInit {
  route = inject(ActivatedRoute);
  crm = inject(CrmClientService);
  router = inject(Router);

  activeCompanyId = toSignal(
    this.crm.company.activeCompany().pipe(map((c) => c.id))
  );
  selectedPlaceId = signal(-1);
  placeLinkGetter = (place) => `/crm/calendar/place/${place.id}`;

  @HostBinding('class.menu-opened')
  menuOpened = false;

  readonly lastCalendarPlaceIdKey = 'calendar_lsp';

  initPlaceIdGetter = () =>
    +this.route.children?.[0]?.snapshot?.params?.placeId ||
    +window.localStorage.getItem(this.lastCalendarPlaceIdKey);

  get routePlaceId() {
    return +this.route.children?.[0]?.snapshot?.params?.placeId;
  }

  ngOnInit() {
    if (!this.routePlaceId) {
      const lsp = +window.localStorage.getItem(this.lastCalendarPlaceIdKey);
      if (lsp > 0) {
        this.router.navigate(['place', lsp], { relativeTo: this.route });
      }
    }
  }

  toggleMenu() {
    this.menuOpened = !this.menuOpened;
  }

  onSelectPlace(e) {
    const placeId = e?.place?.data?.id;
    window.localStorage.setItem(this.lastCalendarPlaceIdKey, placeId);
  }
}
