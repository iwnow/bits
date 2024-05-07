import { Component, OnInit, inject } from '@angular/core';
import { viewDestroy } from 'crm-utils';
import { AdminPageService } from '../admin-page.service';

@Component({
  selector: 'b-admin-page-objects',
  templateUrl: './admin-page-objects.component.html',
  styleUrls: ['./admin-page-objects.component.scss'],
  standalone: true
})
export class AdminPageObjectsComponent implements OnInit {
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
