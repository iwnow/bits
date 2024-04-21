import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'b-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
  standalone: true,
  imports: [CommonModule, MenuModule],
})
export class AdminPageComponent implements OnInit {
  items: MenuItem[] | undefined;
  activeItem: MenuItem | undefined;

  ngOnInit() {
    this.items = this.createMenuItems();
    this.activeItem = this.items[0];
  }

  createMenuItems(): MenuItem[] {
    return (this.items = [
      {
        label: 'Пользователи',
        items: [
          {
            label: 'Список',
            routerLink: 'users'
          },
        ],
      },
    ]);
  }
}
