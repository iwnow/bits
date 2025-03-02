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
import { filter, shareReplay, switchMap } from 'rxjs';

@Component({
  selector: 'b-dropdown-company-objects',
  templateUrl: './dropdown-company-objects.component.html',
  styleUrls: ['./dropdown-company-objects.component.scss'],
  standalone: true,
  imports: [CommonModule, DropdownModule, FormsModule],
})
export class DropdownCompanyObjectsComponent implements OnInit {
  companyId = input<number>();
  companyId$ = useObservable(this.companyId);
  crm = inject(CrmClientService);
  objects$ = this.companyId$.pipe(
    filter((id) => id > 0),
    switchMap((id) => this.crm.server.manager.companyObjects(id)),
    shareReplay(1)
  );
  selectedObject: DTO.DTOCompanyObject;
  selectObject = output<DTO.DTOCompanyObject>();

  ngOnInit() {}

  onSelectObject(e) {
    this.selectedObject = e.value;
    this.selectObject.emit(this.selectedObject);
  }
}
