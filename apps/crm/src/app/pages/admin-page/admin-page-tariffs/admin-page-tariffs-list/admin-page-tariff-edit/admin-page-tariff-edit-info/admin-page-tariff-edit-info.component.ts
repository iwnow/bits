import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { FrmsComponent } from 'bits-frms';
import { DOMAIN, DTO } from 'crm-core';
import {
  formatDate,
  inheritResolvers,
  parseErrorMessage,
  setHours,
} from 'crm-utils';
import { DropdownCompanyComponent } from 'crm/components/dropdown-company/dropdown-company.component';
import { uiElements } from 'crm/core/ui-elements';
import { useAdminCommon } from 'crm/pages/admin-page/admin-common';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';
import { PanelModule } from 'primeng/panel';
import { first, firstValueFrom, takeUntil } from 'rxjs';

@Component({
  selector: 'b-admin-page-tariff-edit-info',
  templateUrl: './admin-page-tariff-edit-info.component.html',
  styleUrls: ['./admin-page-tariff-edit-info.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FrmsComponent,
    PanelModule,
    CheckboxModule,
    FormsModule,
    DropdownCompanyComponent,
    ReactiveFormsModule,
    CalendarModule,
    ButtonModule,
    InputNumberModule,
  ],
})
export class AdminPageTariffEditInfoComponent implements OnInit {
  ad = useAdminCommon();

  @ViewChild(FrmsComponent)
  frms: FrmsComponent;

  companyPlaceEntity = DOMAIN.CompanyPlace;
  saving = false;
  routeData: any;
  tariff: DOMAIN.CompanyTariff = null;
  selectedCompany = signal<DTO.DTOCompany | null>(null);
  setupCompany = signal<DTO.DTOCompany | null>(null);
  companyTariffEntity = DOMAIN.CompanyTariff;
  companyTariffValue: Partial<DOMAIN.CompanyTariff>;
  fb = inject(FormBuilder);
  fgTariff: FormGroup = this.fb.group({
    periods: this.fb.array([]),
  });

  get companyObjectName() {
    return this.tariff?.name || '';
  }

  get periodsFormArray() {
    return (this.fgTariff?.controls?.periods || []) as FormArray<FormGroup>;
  }

  ngOnInit() {
    this.routeData = inheritResolvers(this.ad.route);
    this.tariff = this.routeData.tariff;
    this.ad.crm.company
      .selectCompanies()
      .pipe(first(), takeUntil(this.ad.destroy$))
      .subscribe((cs) => {
        const sc = cs.find((c) => c.id === this.tariff.company_id);
        this.setupCompany.set(sc);
        this.selectedCompany.set(sc);
      });
    this.companyTariffValue = this.tariff;
    this.tariff.data.periods.forEach((p) => {
      const [sh, sm] = p.start.split(':');
      const [eh, em] = p.end.split(':');
      this.periodsFormArray.push(
        this.fb.group({
          start: setHours(new Date().setMinutes(+sm, 0, 0), +sh),
          end: setHours(new Date().setMinutes(+em, 0, 0), +eh),
          amount: p.amount,
        })
      );
    });

    this.ad.page.updateRibbonMenu([
      uiElements.menuItems.saveButton({
        command: () => {
          this.saveTariff();
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

  async saveTariff() {
    if (this.saving) {
      return;
    }
    const valid = this.valid();
    if (Array.isArray(valid)) {
      this.ad.msg.add({
        severity: 'warn',
        summary: 'Не верно заполнен тариф',
        detail: valid.join(' '),
      });
      return;
    }
    this.saving = true;
    try {
      const tariff: Partial<DTO.DTOTariff> = {
        id: this.tariff.id,
        company_id: this.selectedCompany().id,
        name: this.frms.getValue<any>().name,
        data: {
          periods: this.fgTariff.value.periods.map((p) => {
            return {
              amount: p.amount,
              start: formatDate(p.start, 'HH:mm'),
              end: formatDate(p.end, 'HH:mm'),
            };
          }),
        },
      };
      await firstValueFrom(this.ad.crm.server.admin.tariffEdit(tariff));
      this.ad.msg.add({
        severity: 'success',
        summary: 'Тариф успешно сохранен',
      });
    } catch (err) {
      const message = parseErrorMessage(err);
      this.ad.msg.add({
        severity: 'error',
        summary: 'Ошибка сохранения тарифа',
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

  onAddPeriod(e) {
    this.periodsFormArray.push(
      this.fb.group({
        start: setHours(new Date().setMinutes(0, 0, 0), 12),
        end: setHours(new Date().setMinutes(0, 0, 0), 14),
        amount: 0,
      })
    );
  }

  onRemovePeriod(i, e) {
    this.periodsFormArray.removeAt(i);
  }

  valid() {
    const errors: string[] = [];
    if (!this.selectedCompany()) {
      errors.push('Не выбрана компания');
    }

    const name = this.frms.getValue<any>()?.name?.trim();
    if (!name) {
      errors.push('Не задано имя тарифа');
    }

    const periods: any[] = this.fgTariff.value.periods;
    periods.forEach((p) => {
      if (p.amount < 0) {
        errors.push('Не верна указана стоимость периода');
      }
    });

    if (!errors.length) {
      return true;
    }
    return errors;
  }
}
