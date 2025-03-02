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
import { useObservable } from 'crm-utils';
import { DropdownModule } from 'primeng/dropdown';
import { filter, map, shareReplay, switchMap } from 'rxjs';

@Component({
  selector: 'b-dropdown-company',
  templateUrl: './dropdown-company.component.html',
  styleUrls: ['./dropdown-company.component.scss'],
  standalone: true,
  imports: [CommonModule, DropdownModule, FormsModule],
})
export class DropdownCompanyComponent implements OnInit {
  crm = inject(CrmClientService);
  companies$ = this.crm.company.selectCompanies().pipe(shareReplay(1));
  selectedCompany: DTO.DTOCompany;
  selectCompany = output<DTO.DTOCompany>();

  ngOnInit() {}

  onSelectObject(e) {
    this.selectedCompany = e.value;
    this.selectCompany.emit(this.selectedCompany);
  }
}
