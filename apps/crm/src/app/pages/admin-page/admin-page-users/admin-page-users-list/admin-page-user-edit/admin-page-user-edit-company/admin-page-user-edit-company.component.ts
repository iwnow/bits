import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, computed, signal } from '@angular/core';
import { FrmsComponent, frmControl, frmGroup } from 'bits-frms';
import { DOMAIN, DTO } from 'crm-core';
import { inheritResolvers, parseErrorMessage } from 'crm-utils';
import { uiElements } from 'crm/core/ui-elements';
import { useAdminCommon } from 'crm/pages/admin-page/admin-common';
import { PanelModule } from 'primeng/panel';
import {
  Observable,
  firstValueFrom,
  forkJoin,
  map,
  takeUntil,
  tap,
} from 'rxjs';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'b-admin-page-user-edit-company',
  templateUrl: './admin-page-user-edit-company.component.html',
  styleUrls: ['./admin-page-user-edit-company.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FrmsComponent,
    PanelModule,
    DropdownModule,
    FormsModule,
  ],
})
export class AdminPageUserEditCompanyComponent implements OnInit {
  ad = useAdminCommon();

  userCompany = signal<DTO.DTOCompanyUser>(null);
  frmEntity = UserCompanyForm;
  frmEntityUserObject = UserObjectForm;

  companyName = computed(() => {
    return this.userCompany()?.company?.name || '';
  });

  @ViewChild('userCompanyRef')
  frms: FrmsComponent;

  @ViewChild('userObjectRef')
  userObjectRef: FrmsComponent;

  selectedObject: DTO.DTOCompanyObject;
  saving = false;
  routeData: any;
  loadingObjects = signal(true);
  objects = signal<DTO.DTOCompanyObject[]>([]);
  userObject = signal<Partial<DTO.DTOCompanyUserObject>>(null);

  async ngOnInit() {
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
    this.routeData.userCompany = await firstValueFrom(
      this.ad.crm.server.admin.companyUser(this.routeData.user.id)
    );
    this.ad.route.params
      .pipe(
        map((p) => +p.companyId),
        tap((id) => {
          this.userObject.set(null);
          this.selectedObject = null;
          this.loadObjects(id);
        }),
        map((companyId) =>
          this.routeData.userCompany.find((i) => i.company_id === companyId)
        ),
        takeUntil(this.ad.destroy$)
      )
      .subscribe((userCompany) => {
        this.userCompany.set(userCompany);
      });
  }

  loadObjects(companyId: number) {
    this.loadingObjects.set(true);
    this.ad.crm.server.manager
      .companyObjects(companyId)
      .pipe(takeUntil(this.ad.destroy$))
      .subscribe((r) => {
        this.objects.set(r);
        this.loadingObjects.set(false);
      });
  }

  saveRights() {
    if (this.saving) {
      return;
    }
    const { rights }: DTO.DTOCompanyUser = this.frms.getValue();
    const uc = this.userCompany();
    const companyUserUpdate$ = this.ad.crm.server.admin.companyUserUpdate({
      id: uc.id,
      rights,
    });

    const uo = this.userObject();
    const { rights: userObjectRights } = this.userObjectRef.getValue<any>();
    let updateUserObjectRights$: Observable<any>;
    if (uo.id) {
      updateUserObjectRights$ = this.ad.crm.server.admin.updateUserObject({
        rights: userObjectRights,
        id: uo.id,
      });
    } else {
      updateUserObjectRights$ = this.ad.crm.server.admin
        .createUserObject({
          company_user: uc.id,
          object_id: uo.object_id,
          rights: userObjectRights,
        })
        .pipe(
          tap((r) => {
            uo.id = r.detail.id;
            this.userObject.set({ ...uo });
          })
        );
    }

    forkJoin([companyUserUpdate$, updateUserObjectRights$]).subscribe({
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

  onSelectObject(e) {
    const o: DTO.DTOCompanyObject = e.value;
    const userCompanyId = this.userCompany().id;
    this.ad.crm.server.admin
      .companyUserObject(userCompanyId, o.id)
      .subscribe((r) => {
        this.userObject.set(
          r || { rights: [], company_user: userCompanyId, object_id: o.id }
        );
      });
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

@frmGroup()
class UserObjectForm extends DTO.DTOCompanyUser {
  @frmControl({
    type: 'groupCheckbox',
    label: false,
    inputs: {
      options: Object.values(DOMAIN.RIGHTS.COMPANY_OBJECTS),
    },
  })
  override rights: string[];
}
