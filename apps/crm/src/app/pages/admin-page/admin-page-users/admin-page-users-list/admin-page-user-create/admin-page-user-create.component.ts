import { Component, OnInit, ViewChild } from '@angular/core';
import { UserCreateComponent } from '../user-create/user-create.component';
import { CommonModule } from '@angular/common';
import { useAdminCommon } from 'crm/pages/admin-page/admin-common';
import { PanelModule } from 'primeng/panel';
import { uiElements } from 'crm/core/ui-elements';
import { dateUtil, parseErrorMessage } from 'crm-utils';
import { DOMAIN, DTO } from 'crm-core';

@Component({
  selector: 'b-admin-page-user-create',
  templateUrl: './admin-page-user-create.component.html',
  styleUrls: ['./admin-page-user-create.component.css'],
  standalone: true,
  imports: [CommonModule, UserCreateComponent, PanelModule],
})
export class AdminPageUserCreateComponent implements OnInit {
  ad = useAdminCommon();

  @ViewChild(UserCreateComponent)
  ucc: UserCreateComponent;

  saving = false;

  ngOnInit() {
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
    const user = DOMAIN.toDTO<DTO.DTOUser>(this.ucc.getUser(), DOMAIN.User);

    this.ad.crm.server.admin.createUser(user).subscribe({
      next: () => {
        this.saving = false;
        this.ad.msg.add({
          severity: 'success',
          summary: 'Пользователь создан успешно',
        });
        this.ad.router.navigate(['..'], { relativeTo: this.ad.route });
      },
      error: (err) => {
        this.saving = false;
        const message = parseErrorMessage(err);
        this.ad.msg.add({
          severity: 'error',
          summary: 'Ошибка создания пользователя',
          detail: message,
        });
      },
    });
  }

  cancel() {
    this.ad.router.navigate(['..'], { relativeTo: this.ad.route });
  }
}
