import { CommonModule } from '@angular/common';
import { Component, OnInit, signal, effect } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FrmsComponent } from 'bits-frms';
import { DOMAIN, DTO, HELPERS } from 'crm-core';
import { addMonths, inheritResolvers, parseErrorMessage } from 'crm-utils';
import { uiElements } from 'crm/core/ui-elements';
import { useAdminCommon } from 'crm/pages/admin-page/admin-common';
import { DateFormatPipe } from 'crm/pipes';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';
import { PanelModule } from 'primeng/panel';
import { takeUntil } from 'rxjs';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'b-admin-page-place-edit-worksheds',
  templateUrl: './admin-page-place-edit-worksheds.component.html',
  styleUrls: ['./admin-page-place-edit-worksheds.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FrmsComponent,
    PanelModule,
    CheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    ButtonModule,
    InputNumberModule,
    DateFormatPipe,
    TagModule,
  ],
})
export class AdminPagePlaceEditWorkshedsComponent implements OnInit {
  ad = useAdminCommon();

  saving = false;
  routeData: any;
  companyPlace = signal<DTO.DTOPlace>(null);
  worksheds = signal<DOMAIN.PlaceWorkshed[]>([]);
  selectedEditWorkshed = signal<Partial<DOMAIN.PlaceWorkshed>>(null);
  updateMenuEffect = effect(
    () => {
      const editMode = !!this.selectedEditWorkshed();
      if (editMode) {
        this.setEditWorkshedMenu();
      } else {
        this.setDefaultMenu();
      }
    },
    { allowSignalWrites: true }
  );
  WEEKDAYS = HELPERS.HELPER_WEEKDAYS.WEEKDAYS;
  WEEKDAYS_ID_NAME = HELPERS.HELPER_WEEKDAYS.WEEKDAYS_ID_NAME;

  ngOnInit() {
    this.routeData = inheritResolvers(this.ad.route);
    this.companyPlace.set(this.routeData.companyPlace);
    this.refresh();
    this.setDefaultMenu();
    this.ad.destroy$.subscribe(() => {
      this.ad.page.clearRibbonMenu();
    });
    this.selectedEditWorkshed;
  }

  setDefaultMenu() {
    this.ad.page.updateRibbonMenu([
      uiElements.menuItems.createButton({
        command: () => {
          this.addNewWorkshed();
        },
      }),
      uiElements.menuItems.closeButton({
        command: () => {
          this.cancel();
        },
      }),
    ]);
  }

  setEditWorkshedMenu() {
    this.ad.page.updateRibbonMenu([
      uiElements.menuItems.saveButton({
        command: () => {
          this.saveWorksheds();
        },
      }),
      uiElements.menuItems.closeButton({
        command: () => {
          this.selectedEditWorkshed.set(null);
        },
      }),
    ]);
  }

  addNewWorkshed() {
    this.selectedEditWorkshed.set({
      place_id: this.companyPlace().id,
      date_from: new Date(),
      date_to: addMonths(new Date(), 6),
      data: [],
    });
  }

  async saveWorksheds() {
    if (this.saving) {
      return;
    }
    this.saving = true;
    try {
    } catch (err) {
      const message = parseErrorMessage(err);
      this.ad.msg.add({
        severity: 'error',
        summary: 'Ошибка редактирования режима работы',
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

  refresh() {
    this.ad.crm.server.admin
      .placeWorksheds(this.companyPlace().id)
      .pipe(takeUntil(this.ad.destroy$))
      .subscribe((ws) => {
        const items = ws.data.map((i) => this.toDomainPlaceWorkshed(i));
        this.worksheds.set(items);
      });
  }

  toDomainPlaceWorkshed(dto: DTO.DTOPlaceWorkshed): DOMAIN.PlaceWorkshed {
    const res = DOMAIN.PlaceWorkshed.fromDTO(dto);
    return res;
  }
}
