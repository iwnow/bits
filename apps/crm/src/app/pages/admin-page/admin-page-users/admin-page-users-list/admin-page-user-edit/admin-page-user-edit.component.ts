import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FrmsComponent } from 'bits-frms';
import { dateUtil, parseErrorMessage } from 'crm-utils';
import { DTOUser } from 'crm/core/dto';
import { uiElements } from 'crm/core/ui-elements';
import { useAdminCommon } from 'crm/pages/admin-page/admin-common';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'b-admin-page-user-edit',
  templateUrl: './admin-page-user-edit.component.html',
  styleUrls: ['./admin-page-user-edit.component.css'],
  standalone: true,
  imports: [CommonModule, FrmsComponent, PanelModule],
})
export class AdminPageUserEditComponent implements OnInit {
  ad = useAdminCommon();

  @ViewChild(FrmsComponent)
  frms: FrmsComponent;

  userEntity = DTOUser;
  saving = false;
  user: DTOUser = null;

  ngOnInit() {
    this.user = this.ad.route.snapshot.data.user;
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
    const user = this.frms.getValue<DTOUser>();
    user.birth_date = user.birth_date
      ? dateUtil(user.birth_date).format('YYYY-MM-DD')
      : undefined;
    user.is_admin = !!user.is_admin;
    user.phone = user.phone ? user.phone.replace(/\D/g, '') : null;
    user.id = this.user.id;

    this.ad.crm.server.admin.editUser(user).subscribe({
      next: () => {
        this.saving = false;
        this.ad.msg.add({
          severity: 'success',
          summary: 'Пользователь успешно сохранен',
        });
        this.ad.router.navigate(['..'], { relativeTo: this.ad.route });
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
    this.ad.router.navigate(['..'], { relativeTo: this.ad.route });
  }
}
