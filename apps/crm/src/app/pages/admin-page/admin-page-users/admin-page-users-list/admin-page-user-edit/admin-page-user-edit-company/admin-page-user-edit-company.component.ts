import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, computed, signal } from '@angular/core';
import { FrmsComponent, frmControl, frmGroup } from 'bits-frms';
import { DOMAIN, DTO } from 'crm-core';
import { inheritResolvers, parseErrorMessage } from 'crm-utils';
import { uiElements } from 'crm/core/ui-elements';
import { useAdminCommon } from 'crm/pages/admin-page/admin-common';
import { PanelModule } from 'primeng/panel';
import { map, takeUntil } from 'rxjs';

@Component({
  selector: 'b-admin-page-user-edit-company',
  templateUrl: './admin-page-user-edit-company.component.html',
  styleUrls: ['./admin-page-user-edit-company.component.css'],
  standalone: true,
  imports: [CommonModule, FrmsComponent, PanelModule],
})
export class AdminPageUserEditCompanyComponent implements OnInit {
  ad = useAdminCommon();

  userCompany = signal<DTO.DTOCompanyUser>(null);
  frmEntity = UserCompanyForm;

  companyName = computed(() => {
    return this.userCompany()?.company?.name || '';
  });

  @ViewChild(FrmsComponent)
  frms: FrmsComponent;

  saving = false;
  routeData: any;

  ngOnInit() {
    this.ad.page.updateRibbonMenu([
      uiElements.menuItems.saveButton({
        command: () => {
          this.saveRights();
        },
      }),
      uiElements.menuItems.cancelButton({
        command: () => {
          this.cancel();
        },
      }),
    ]);
    this.ad.destroy$.subscribe(() => {
      this.ad.page.clearRibbonMenu();
    });
    this.routeData = inheritResolvers(this.ad.route);
    this.ad.route.params
      .pipe(
        map((p) => +p.companyId),
        map((companyId) =>
          this.routeData.userCompany.find((i) => i.company_id === companyId)
        ),
        takeUntil(this.ad.destroy$)
      )
      .subscribe((userCompany) => {
        this.userCompany.set(userCompany);
      });
  }

  saveRights() {
    if (this.saving) {
      return;
    }
    const { rights }: DTO.DTOCompanyUser = this.frms.getValue();
    const uc = this.userCompany();
    this.ad.crm.server.admin
      .companyUserUpdate({
        id: uc.id,
        rights,
      })
      .subscribe({
        next: () => {
          this.saving = false;
          const rduc = this.routeData.userCompany.find((i) => i.id === uc.id);
          rduc.rights = rights;
          this.ad.msg.add({
            severity: 'success',
            summary: 'Права успешно сохранены',
          });
        },
        error: (err) => {
          this.saving = false;
          const message = parseErrorMessage(err);
          this.ad.msg.add({
            severity: 'error',
            summary: 'Ошибка редактирования права',
            detail: message,
          });
        },
      });
  }

  cancel() {
    this.ad.toRootRoute();
  }
}

@frmGroup()
class UserCompanyForm extends DTO.DTOCompanyUser {
  @frmControl({
    type: 'groupCheckbox',
    label: false,
    inputs: {
      options: Object.values(DOMAIN.RIGHTS.COMPANY),
    },
  })
  override rights: string[];
}
