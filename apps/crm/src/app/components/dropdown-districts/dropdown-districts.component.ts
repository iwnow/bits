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
  selector: 'b-dropdown-districts',
  templateUrl: './dropdown-districts.component.html',
  styleUrls: ['./dropdown-districts.component.scss'],
  standalone: true,
  imports: [CommonModule, DropdownModule, FormsModule],
})
export class DropdownDistrictsComponent implements OnInit {
  crm = inject(CrmClientService);
  companies$ = this.crm.company
    .selectCompanies()
    .pipe(shareLast());
  selectedCompany: DTO.DTOCompany;
  selectCompany = output<DTO.DTOCompany>();
  setupCompany = input<DTO.DTOCompany>();

  ngOnInit() {
    if (this.setupCompany()) {
      this.selectedCompany = this.setupCompany();
    }
  }

  onSelectObject(e) {
    this.selectedCompany = e.value;
    this.selectCompany.emit(this.selectedCompany);
  }
}
