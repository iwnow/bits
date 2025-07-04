import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { FrmsComponent } from 'bits-frms';
import { DOMAIN, DTO } from 'crm-core';
import { formatDate, getHours, parseErrorMessage, setHours } from 'crm-utils';
import { DropdownCompanyObjectsComponent } from 'crm/components/dropdown-company-objects/dropdown-company-objects.component';
import { DropdownCompanyComponent } from 'crm/components/dropdown-company/dropdown-company.component';
import { uiElements } from 'crm/core/ui-elements';
import { useAdminCommon } from 'crm/pages/admin-page/admin-common';
import { CheckboxModule } from 'primeng/checkbox';
import { PanelModule } from 'primeng/panel';
import { firstValueFrom } from 'rxjs';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'b-admin-page-tariff-create',
  templateUrl: './admin-page-tariff-create.component.html',
  styleUrls: ['./admin-page-tariff-create.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FrmsComponent,
    PanelModule,
    CheckboxModule,
    FormsModule,
    DropdownCompanyObjectsComponent,
    DropdownCompanyComponent,
    ReactiveFormsModule,
    CalendarModule,
    ButtonModule,
    InputNumberModule,
  ],
})
export class AdminPageTariffCreateComponent implements OnInit, AfterViewInit {
  ad = useAdminCommon();
  fb = inject(FormBuilder);

  @ViewChild(FrmsComponent)
  frms: FrmsComponent;

  companyTariffEntity = DOMAIN.CompanyTariff;
  saving = false;
  companyTariffValue: Partial<DOMAIN.CompanyTariff>;
  selectedCompany = signal<DTO.DTOCompany>(null);
  selectedObject = signal<DTO.DTOCompanyObject>(null);
  fgTariff: FormGroup = this.fb.group({
    periods: this.fb.array([]),
  });

  get periodsFormArray() {
    return (this.fgTariff?.controls?.periods || []) as FormArray<FormGroup>;
  }

  ngOnInit() {
    this.onAddPeriod(null);
    this.ad.page.updateRibbonMenu([
      uiElements.menuItems.createButton({
        command: () => {
          this.createTariff();
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

  ngAfterViewInit(): void {}

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

  async createTariff() {
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
      await firstValueFrom(this.ad.crm.server.admin.tariffCreate(tariff));
      this.ad.msg.add({
        severity: 'success',
        summary: 'Тариф успешно создан',
      });
      this.cancelRoute();
    } catch (err) {
      const message = parseErrorMessage(err);
      this.ad.msg.add({
        severity: 'error',
        summary: 'Ошибка создания тарифа',
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
    this.ad.router.navigate(['..'], { relativeTo: this.ad.route });
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
