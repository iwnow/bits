import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { useAdminCommon } from '../../admin-common';
import { DOMAIN, DTO } from 'crm-core';
import { addDays, inheritResolvers } from 'crm-utils';
import { FormsModule } from '@angular/forms';
import { FrmsComponent } from 'bits-frms';
import { CheckboxModule } from 'primeng/checkbox';
import { PanelModule } from 'primeng/panel';
import { firstValueFrom, forkJoin, switchMap, takeUntil, tap } from 'rxjs';
import { uiElements } from 'crm/core/ui-elements';
import { MoneyPipe } from 'crm/pipes/money.pipe';
import { DividerModule } from 'primeng/divider';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TariffsListSearchComponent } from '../tariffs-list-search/tariffs-list-search.component';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'b-admin-page-tariffs-place',
  templateUrl: './admin-page-tariffs-place.component.html',
  styleUrls: ['./admin-page-tariffs-place.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FrmsComponent,
    PanelModule,
    CheckboxModule,
    FormsModule,
    MoneyPipe,
    DividerModule,
    SelectButtonModule,
    ButtonModule,
    CalendarModule,
  ],
  providers: [DialogService],
})
export class AdminPageTariffsPlaceComponent implements OnInit {
  ad = useAdminCommon();
  routeData: any;
  companyPlace = signal<DOMAIN.CompanyPlace>(null);
  rules = signal<DTO.DTOTariffPlaceRule[]>([]);
  dialog = inject(DialogService);
  dialogRef: DynamicDialogRef | undefined;

  get placeName() {
    return this.companyPlace()?.name || '';
  }

  get objectName() {
    return this.companyPlace()?.object?.name || '';
  }

  defaultRibbonItems = [
    uiElements.menuItems.createButton({
      label: 'Добавить правило',
      command: () => {
        this.add();
      },
    }),
    uiElements.menuItems.saveButton({
      command: () => {
        this.save();
      },
    }),
  ];

  weekdays: any[] = [
    { name: 'Пн', value: 0 },
    { name: 'Вт', value: 1 },
    { name: 'Ср', value: 2 },
    { name: 'Чт', value: 3 },
    { name: 'Пт', value: 4 },
    { name: 'Сб', value: 5 },
    { name: 'Вс', value: 6 },
  ];

  ngOnInit() {
    this.ad.route.params.pipe(takeUntil(this.ad.destroy$)).subscribe(() => {
      this.routeData = inheritResolvers(this.ad.route);
      this.companyPlace.set(this.routeData.companyPlace);
    });
    this.ad.page.updateRibbonMenu(this.defaultRibbonItems);
    this.ad.destroy$.subscribe(() => {
      this.ad.page.clearRibbonMenu();
    });
    this.ad
      .signalToObs(this.companyPlace)
      .pipe(
        switchMap((p) => this.ad.crm.server.admin.tariffPlaceRules(p.id)),
        takeUntil(this.ad.destroy$)
      )
      .subscribe((rules) => {
        rules.data.forEach((rd) => {
          rd.date_from = new Date(rd.date_from) as any;
          rd.date_to = new Date(rd.date_to) as any;
        });
        this.rules.set(rules.data);
      });
  }

  async save() {
    try {
      const createRules = this.rules().filter((r) => r.id < 0);
      const updRules = this.rules().filter((r) => r.id > 0);
      await firstValueFrom(
        forkJoin([
          ...createRules.map((cr) =>
            this.ad.crm.server.admin
              .tariffPlaceRuleCreate({
                ...cr,
                tariff_id: cr.tariff.id,
                tariff: undefined,
                id: undefined,
              })
              .pipe(
                tap((r) => {
                  cr.id = 0.1;
                  console.log(r);
                })
              )
          ),
          ...updRules.map((cr) =>
            this.ad.crm.server.admin.tariffPlaceRuleUpdate(cr)
          ),
        ])
      );
      this.ad.msgSuccess('Тарифы сохранены успешно');
    } catch (error) {
      console.error(error);
      this.ad.msgError('Ошибка сохранения тарифных правил');
    }
  }

  add() {
    const selectedTariffs = this.rules().map((r) => r.tariff);
    this.dialogRef = this.dialog.open(TariffsListSearchComponent, {
      header: 'Выберите тарифф',
      data: {
        selectedTariffs,
      },
    });
    this.ad.destroy$.subscribe(() => {
      this.dialogRef.close();
    });
    this.dialogRef.onClose.pipe(takeUntil(this.ad.destroy$)).subscribe((r) => {
      if (!r?.tariffs) {
        return;
      }
      const place_id = this.companyPlace().id;

      const newRules: DTO.DTOTariffPlaceRule[] = r.tariffs
        .filter((t) => !selectedTariffs.find((st) => st.id == t.id))
        .map((i: DTO.DTOTariff) => {
          const rule: DTO.DTOTariffPlaceRule = {
            id: -1,
            date_from: new Date().toISOString(),
            date_to: addDays(new Date(), 7).toISOString(),
            tariff: i,
            weekdays: [],
            place_id,
          };
          return rule;
        });

      const rules = [...this.rules(), ...newRules];
      this.rules.set(rules);
    });
  }

  removeRule(rule: DTO.DTOTariffPlaceRule, e?: Event) {
    const remove = () => {
      const rules = this.rules().filter((r) => r !== rule);
      this.rules.set(rules);
    };
    this.ad.confirmPopup({
      target: e.target as EventTarget,
      message: `Удалить тарифное правило для "${rule.tariff.name}"?`,
      icon: 'pi pi-info-circle',
      accept: () => {
        if (rule.id === -1) {
          remove();
        } else {
          this.ad.crm.server.admin.tariffPlaceRuleDelete(rule.id).subscribe({
            next: () => {
              remove();
              this.ad.msgSuccess('Удалено тарифное правило');
            },
            error: (err) => {
              console.error(err);
              this.ad.msgError('При удалении правила произошла ошибка');
            },
          });
        }
      },
      reject: () => {},
    });
  }
}
