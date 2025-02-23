import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FrmsComponent } from 'bits-frms';
import { DOMAIN, DTO } from 'crm-core';
import { inheritResolvers, parseErrorMessage } from 'crm-utils';
import { uiElements } from 'crm/core/ui-elements';
import { useAdminCommon } from 'crm/pages/admin-page/admin-common';
import { CheckboxModule } from 'primeng/checkbox';
import { PanelModule } from 'primeng/panel';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'b-admin-page-place-edit-info',
  templateUrl: './admin-page-place-edit-info.component.html',
  styleUrls: ['./admin-page-place-edit-info.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FrmsComponent,
    PanelModule,
    CheckboxModule,
    FormsModule,
  ],
})
export class AdminPagePlaceEditInfoComponent implements OnInit {
  ad = useAdminCommon();

  @ViewChild(FrmsComponent)
  frms: FrmsComponent;

  companyPlaceEntity = DOMAIN.CompanyPlace;
  saving = false;
  routeData: any;
  companyPlace: DOMAIN.CompanyPlace = null;

  get companyObjectName() {
    return this.companyPlace?.name || '';
  }

  ngOnInit() {
    this.routeData = inheritResolvers(this.ad.route);
    this.companyPlace = this.routeData.companyPlace;
    this.ad.page.updateRibbonMenu([
      uiElements.menuItems.saveButton({
        command: () => {
          this.saveObject();
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

  async saveObject() {
    if (this.saving || !this.frms.getValid()) {
      return;
    }
    this.saving = true;
    try {
      const object = DOMAIN.toDTO<DTO.DTOCompanyObject>(
        this.frms.getValue(),
        DOMAIN.CompanyObject
      );
      object.address = object.address_info.address;
      delete object.address_info;
      await firstValueFrom(this.ad.crm.server.admin.updateObject(object));
      this.ad.msg.add({
        severity: 'success',
        summary: 'Обьект успешно сохранен',
      });
    } catch (err) {
      const message = parseErrorMessage(err);
      this.ad.msg.add({
        severity: 'error',
        summary: 'Ошибка редактирования обьекта',
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
    this.ad.router.navigate(['../../..'], { relativeTo: this.ad.route });
  }
}
