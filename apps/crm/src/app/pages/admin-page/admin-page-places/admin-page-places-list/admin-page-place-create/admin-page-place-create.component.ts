import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FrmsComponent } from 'bits-frms';
import { DOMAIN, DTO } from 'crm-core';
import { parseErrorMessage } from 'crm-utils';
import { DropdownCompanyObjectsComponent } from 'crm/components/dropdown-company-objects/dropdown-company-objects.component';
import { DropdownCompanyComponent } from 'crm/components/dropdown-company/dropdown-company.component';
import { uiElements } from 'crm/core/ui-elements';
import { useAdminCommon } from 'crm/pages/admin-page/admin-common';
import { CheckboxModule } from 'primeng/checkbox';
import { PanelModule } from 'primeng/panel';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'b-admin-page-place-create',
  templateUrl: './admin-page-place-create.component.html',
  styleUrls: ['./admin-page-place-create.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FrmsComponent,
    PanelModule,
    CheckboxModule,
    FormsModule,
    DropdownCompanyObjectsComponent,
    DropdownCompanyComponent,
  ],
})
export class AdminPagePlaceCreateComponent implements OnInit, AfterViewInit {
  ad = useAdminCommon();

  @ViewChild(FrmsComponent)
  frms: FrmsComponent;

  companyPlaceEntity = DOMAIN.CompanyPlace;
  saving = false;
  companyPlaceValue: Partial<DOMAIN.CompanyPlace>;
  selectedCompany = signal<DTO.DTOCompany>(null);
  selectedObject = signal<DTO.DTOCompanyObject>(null);

  get isValid() {
    return this.frms?._fg().valid;
  }

  ngOnInit() {
    this.ad.page.updateRibbonMenu([
      uiElements.menuItems.createButton({
        command: () => {
          this.createPlace();
        },
      }),
      uiElements.menuItems.closeButton({
        command: () => {
          this.cancel();
        },
      }),
    ]);
    this.ad.destroy$.subscribe(() => {
      this.ad.page.clearRibbonMenu();
    });
  }

  ngAfterViewInit(): void {}

  async createPlace() {
    if (this.saving) {
      return;
    }
    if (!this.isValid) {
      this.ad.msg.add({
        severity: 'warn',
        summary: 'Заполните поля обьекта',
      });
      return;
    }
    this.saving = true;
    try {
      const place = DOMAIN.toDTO<DTO.DTOPlace>(
        this.frms.getValue(),
        DOMAIN.CompanyObject
      );
      place.object_id = this.selectedObject().id;
      await firstValueFrom(this.ad.crm.server.admin.createPlace(place));
      this.ad.msg.add({
        severity: 'success',
        summary: 'Обьект успешно создан',
      });
    } catch (err) {
      const message = parseErrorMessage(err);
      this.ad.msg.add({
        severity: 'error',
        summary: 'Ошибка создания обьекта',
        detail: message,
      });
    } finally {
      this.saving = false;
    }
  }

  cancel() {
    this.cancelRoute();
  }

  cancelRoute() {
    this.ad.router.navigate(['..'], { relativeTo: this.ad.route });
  }
}
