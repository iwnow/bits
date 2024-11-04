import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FrmsComponent } from 'bits-frms';
import { DOMAIN, DTO } from 'crm-core';
import { parseErrorMessage } from 'crm-utils';
import { uiElements } from 'crm/core/ui-elements';
import { useAdminCommon } from 'crm/pages/admin-page/admin-common';
import { CheckboxModule } from 'primeng/checkbox';
import { PanelModule } from 'primeng/panel';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'b-admin-page-object-create',
  templateUrl: './admin-page-object-create.component.html',
  styleUrls: ['./admin-page-object-create.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FrmsComponent,
    PanelModule,
    CheckboxModule,
    FormsModule,
  ],
})
export class AdminPageObjectCreateComponent implements OnInit, AfterViewInit {
  ad = useAdminCommon();

  @ViewChild(FrmsComponent)
  frms: FrmsComponent;

  companyObjectEntity = DOMAIN.CompanyObject;
  saving = false;
  companyObjectValue: Partial<DOMAIN.CompanyObject> = {
    address_info: {
      city: {
        id: 1,
        name: 'Москва',
        tzone: 'Europe/Moscow',
      },
      address: '',
      district: undefined,
    },
  };

  get isValid() {
    return this.frms?._fg().valid;
  }

  ngOnInit() {
    this.ad.page.updateRibbonMenu([
      uiElements.menuItems.createButton({
        command: () => {
          this.createObject();
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

  ngAfterViewInit(): void {
    this.frms._fg().controls.company.enable();
  }

  async createObject() {
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
      const object = DOMAIN.toDTO<DTO.DTOCompanyObject>(
        this.frms.getValue(),
        DOMAIN.CompanyObject
      );
      object.address = object.address_info.address;
      object.company_id = object.company?.id;
      object.city_id = object.address_info.city?.id;
      delete object.address_info;
      delete object.company;
      await firstValueFrom(this.ad.crm.server.admin.createObject(object));
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
