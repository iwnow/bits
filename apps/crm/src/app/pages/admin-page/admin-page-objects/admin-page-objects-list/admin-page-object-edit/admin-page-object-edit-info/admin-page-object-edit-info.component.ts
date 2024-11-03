import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FrmsComponent } from 'bits-frms';
import { DOMAIN } from 'crm-core';
import { inheritResolvers } from 'crm-utils';
import { uiElements } from 'crm/core/ui-elements';
import { useAdminCommon } from 'crm/pages/admin-page/admin-common';
import { CheckboxModule } from 'primeng/checkbox';
import { PanelModule } from 'primeng/panel';

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

  saveObject() {}

  cancel() {
    this.cancelRoute();
  }

  cancelRoute() {
    this.ad.router.navigate(['../../..'], { relativeTo: this.ad.route });
  }
}
