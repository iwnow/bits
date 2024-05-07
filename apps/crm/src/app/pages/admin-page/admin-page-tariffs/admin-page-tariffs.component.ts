import { Component, OnInit, inject } from '@angular/core';
import { viewDestroy } from 'crm-utils';
import { AdminPageService } from '../admin-page.service';

@Component({
  selector: 'b-admin-page-tariffs',
  templateUrl: './admin-page-tariffs.component.html',
  styleUrls: ['./admin-page-tariffs.component.scss'],
  standalone: true,
})
export class AdminPageTariffsComponent implements OnInit {
  destroy$ = viewDestroy();
  page = inject(AdminPageService);

  ngOnInit() {
    this.page.updateRibbonMenu([
      {
        label: 'Создать',
        icon: 'pi pi-plus',
      },
    ]);
  }
}
