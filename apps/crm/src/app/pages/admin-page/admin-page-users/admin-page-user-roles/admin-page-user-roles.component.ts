import { Component, OnInit, inject } from '@angular/core';
import { viewDestroy } from 'crm-utils';
import { AdminPageService } from '../../admin-page.service';

@Component({
  selector: 'b-admin-page-user-roles',
  templateUrl: './admin-page-user-roles.component.html',
  styleUrls: ['./admin-page-user-roles.component.css'],
  standalone: true,
})
export class AdminPageUserRolesComponent implements OnInit {
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
