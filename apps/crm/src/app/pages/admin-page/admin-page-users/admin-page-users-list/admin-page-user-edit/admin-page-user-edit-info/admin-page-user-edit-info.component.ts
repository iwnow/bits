import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, signal } from '@angular/core';
import { FrmsComponent, frmControl, frmGroup } from 'bits-frms';
import { DOMAIN, DTO } from 'crm-core';
import { dateUtil, inheritResolvers, parseErrorMessage } from 'crm-utils';
import { uiElements } from 'crm/core/ui-elements';
import { useAdminCommon } from 'crm/pages/admin-page/admin-common';
import { PanelModule } from 'primeng/panel';
import { CheckboxModule } from 'primeng/checkbox';
import { forkJoin, takeUntil } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'b-admin-page-user-edit-info',
  templateUrl: './admin-page-user-edit-info.component.html',
  styleUrls: ['./admin-page-user-edit-info.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FrmsComponent,
    PanelModule,
    CheckboxModule,
    FormsModule,
  ],
})
export class AdminPageUserEditInfoComponent implements OnInit {
  ad = useAdminCommon();

  @ViewChild(FrmsComponent)
  frms: FrmsComponent;

  userEntity = DOMAIN.User;
  saving = false;
  routeData: any;
  user: DOMAIN.User = null;
  companies = signal<DTO.DTOCompany[]>([]);
  selectedCompanies: number[] = [];
  savedCompanies = new Set<number>();

  ngOnInit() {
    this.routeData = inheritResolvers(this.ad.route);
    this.user = this.routeData.user;
    this.selectedCompanies = this.routeData.userCompany.map((i) => {
      this.savedCompanies.add(i.company.id);
      return i.company.id;
    });
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
    this.ad.crm.server.company
      .companies()
      .pipe(takeUntil(this.ad.destroy$))
      .subscribe((r) => {
        r.sort((a, b) => a.id - b.id);
        this.companies.set(r);
      });
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
    const editUser$ = this.ad.crm.server.admin.editUser(user);
    const add = [],
      remove = [];
    this.companies().forEach((c) => {
      const selected = this.selectedCompanies.includes(c.id);
      const saved = this.savedCompanies.has(c.id);
      if (saved && !selected) {
        remove.push(c.id);
      } else if (!saved && selected) {
        add.push(c.id);
      }
    });

    const add$ = add.map((i) =>
      this.ad.crm.server.admin.addCompanyUser({
        user_id: this.user.id,
        company_id: i,
        rights: [],
      })
    );

    const remove$ = remove.map((i) => {
      const id = this.routeData.userCompany.find(
        (uc) => uc.company_id === i
      ).id;
      return this.ad.crm.server.admin.removeCompanyUser(id);
    });

    forkJoin([editUser$, ...add$, ...remove$]).subscribe({
      next: () => {
        this.saving = false;
        this.ad.msg.add({
          severity: 'success',
          summary: 'Пользователь успешно сохранен',
        });
        const companies = this.companies();
        this.ad.updateNavMenu({
          userCompany: this.selectedCompanies.map((i) => {
            const uc: Partial<DTO.DTOCompanyUser> = {
              company_id: i,
              user_id: this.user.id,
              rights:
                this.routeData.userCompany.find((j) => j.company_id === i)
                  ?.rights || [],
              company: companies.find((j) => j.id === i),
            };
            return uc;
          }),
        });
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
