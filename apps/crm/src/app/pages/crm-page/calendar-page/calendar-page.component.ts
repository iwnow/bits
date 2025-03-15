import { Component, HostBinding, inject, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterModule } from '@angular/router';
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
})
export class CalendarPageComponent implements OnInit {
  route = inject(ActivatedRoute);
  crm = inject(CrmClientService);

  activeCompanyId = toSignal(
    this.crm.company.activeCompany().pipe(map((c) => c.id))
  );
  selectedPlaceId = signal(-1);
  placeLinkGetter = (place) => `/crm/calendar/place/${place.id}`;

  @HostBinding('class.menu-opened')
  menuOpened = true;

  ngOnInit() {}

  toggleMenu() {
    this.menuOpened = !this.menuOpened;
  }
}
