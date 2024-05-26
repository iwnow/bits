import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FrmsComponent } from 'bits-frms';
import { DOMAIN, DTO } from 'crm-core';
import { dateUtil, inheritResolvers, parseErrorMessage } from 'crm-utils';
import { uiElements } from 'crm/core/ui-elements';
import { useAdminCommon } from 'crm/pages/admin-page/admin-common';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'b-admin-page-user-edit-info',
  templateUrl: './admin-page-user-edit-info.component.html',
  styleUrls: ['./admin-page-user-edit-info.component.css'],
  standalone: true,
  imports: [CommonModule, FrmsComponent, PanelModule],
})
export class AdminPageUserEditInfoComponent implements OnInit {
  ad = useAdminCommon();

  @ViewChild(FrmsComponent)
  frms: FrmsComponent;

  userEntity = DOMAIN.User;
  saving = false;
  user: DOMAIN.User = null;

  ngOnInit() {
    const routeData = inheritResolvers(this.ad.route);
    this.user = routeData.user;
    this.user.birth_date = this.user.birth_date
      ? dateUtil(this.user.birth_date).toDate()
      : null;
    this.user.gender = +this.user.gender;
    this.ad.page.updateRibbonMenu([
      uiElements.menuItems.saveButton({
        command: () => {
          this.saveUser();
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
  }

  saveUser() {
    if (this.saving) {
      return;
    }
    this.saving = true;
    const user = DOMAIN.toDTO<DTO.DTOUser>(this.frms.getValue(), DOMAIN.User);
    user.id = this.user.id;
    this.ad.crm.server.admin.editUser(user).subscribe({
      next: () => {
        this.saving = false;
        this.ad.msg.add({
          severity: 'success',
          summary: 'Пользователь успешно сохранен',
        });
        this.cancelRoute();
      },
      error: (err) => {
        this.saving = false;
        const message = parseErrorMessage(err);
        this.ad.msg.add({
          severity: 'error',
          summary: 'Ошибка редактирования пользователя',
          detail: message,
        });
      },
    });
  }

  cancel() {
    this.cancelRoute();
  }

  cancelRoute() {
    this.ad.router.navigate(['../../..'], { relativeTo: this.ad.route });
  }
}
