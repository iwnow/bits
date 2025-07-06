import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { useAdminCommon } from '../../admin-common';
import { DOMAIN, DTO } from 'crm-core';
import { inheritResolvers } from 'crm-utils';
import { FormsModule } from '@angular/forms';
import { FrmsComponent } from 'bits-frms';
import { CheckboxModule } from 'primeng/checkbox';
import { PanelModule } from 'primeng/panel';
import { switchMap, takeUntil } from 'rxjs';
import { uiElements } from 'crm/core/ui-elements';
import { MoneyPipe } from 'crm/pipes/money.pipe';
import { DividerModule } from 'primeng/divider';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ButtonModule } from 'primeng/button';

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
  ],
})
export class AdminPageTariffsPlaceComponent implements OnInit {
  ad = useAdminCommon();
  routeData: any;
  companyPlace = signal<DOMAIN.CompanyPlace>(null);
  rules = signal<DTO.DTOTariffPlaceRule[]>([]);

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
        this.rules.set(rules.data);
      });
  }

  save() {}

  add() {}
}
