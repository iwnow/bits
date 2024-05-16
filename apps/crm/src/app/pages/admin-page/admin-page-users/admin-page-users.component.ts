import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AdminPageService } from '../admin-page.service';
import { viewDestroy } from 'crm-utils';

@Component({
  selector: 'b-admin-page-users',
  templateUrl: './admin-page-users.component.html',
  styleUrls: ['./admin-page-users.component.scss'],
  standalone: true,
  imports: [RouterModule],
})
export class AdminPageUsersComponent implements OnInit {
  destroy$ = viewDestroy();
  page = inject(AdminPageService);

  ngOnInit() {
    const menu = this.createMenuItems();
    this.page.updateMenuItems(menu);
    this.destroy$.subscribe(() => {
      this.page.clearMenuItems();
    });
  }

  createMenuItems(): MenuItem[] {
    return [
      {
        label: 'Пользователи',
        items: [
          {
            label: 'Список',
            routerLink: 'users/list',
          },
          // {
          //   label: 'Роли',
          //   routerLink: 'users/roles',
          // },
        ],
      },
    ];
  }
}
