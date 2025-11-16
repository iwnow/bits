import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  Injector,
  input,
  OnInit,
  output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CrmClientService, DTO } from 'crm-core';
import { shareLast, useObservable } from 'crm-utils';
import { DropdownModule } from 'primeng/dropdown';
import { filter, map, shareReplay, switchMap } from 'rxjs';

@Component({
  selector: 'b-dropdown-cities',
  templateUrl: './dropdown-cities.component.html',
  styleUrls: ['./dropdown-cities.component.scss'],
  standalone: true,
  imports: [CommonModule, DropdownModule, FormsModule],
})
export class DropdownCitiesComponent implements OnInit {
  crm = inject(CrmClientService);
  cities$ = this.crm.server.dicts.cities().pipe(shareLast());
  selectedCity: DTO.DTOAddressCity;
  selectCity = output<DTO.DTOAddressCity>();
  setupCity = input<DTO.DTOAddressCity>();

  ngOnInit() {
    if (this.setupCity()) {
      this.selectedCity = this.setupCity();
    }
  }

  onSelectCity(e) {
    this.selectedCity = e.value;
    this.selectCity.emit(this.selectedCity);
  }
}
