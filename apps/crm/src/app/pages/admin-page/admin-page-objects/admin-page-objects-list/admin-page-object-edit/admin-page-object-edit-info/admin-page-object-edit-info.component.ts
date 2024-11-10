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
  selector: 'b-admin-page-object-edit-info',
  templateUrl: './admin-page-object-edit-info.component.html',
  styleUrls: ['./admin-page-object-edit-info.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FrmsComponent,
    PanelModule,
    CheckboxModule,
    FormsModule,
  ],
})
export class AdminPageObjectEditInfoComponent implements OnInit {
  ad = useAdminCommon();

  @ViewChild(FrmsComponent)
  frms: FrmsComponent;

  companyObjectEntity = DOMAIN.CompanyObject;
  saving = false;
  routeData: any;
  companyObject: DOMAIN.CompanyObject = null;

  get companyObjectName() {
    return this.companyObject?.name || '';
  }

  ngOnInit() {
    this.routeData = inheritResolvers(this.ad.route);
    this.companyObject = this.routeData.companyObject;
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
