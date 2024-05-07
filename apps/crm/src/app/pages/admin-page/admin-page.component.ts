import { CommonModule } from '@angular/common';
import { Component, HostBinding, OnInit, signal } from '@angular/core';
import { ContentTabBarComponent } from 'crm/layout/content-tab-bar/content-tab-bar.component';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'b-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
  standalone: true,
  imports: [CommonModule, MenuModule, ContentTabBarComponent],
})
export class AdminPageComponent implements OnInit {
  items: MenuItem[] | undefined;
  activeItem: MenuItem | undefined;
  menuOpened = signal(true);

  @HostBinding('class.menu-opened')
  get isMenuOpened() {
    return this.menuOpened();
  }

  ngOnInit() {
    this.items = this.createMenuItems();
    this.activeItem = this.items[0];
  }

  toggleMenuOpened() {
    this.menuOpened.set(!this.menuOpened());
  }

  createMenuItems(): MenuItem[] {
    return (this.items = [
      {
        label: 'Настройки',
        items: [
          {
            label: 'Пользователи',
            routerLink: 'users',
          },
          {
            label: 'Объекты',
            routerLink: 'objects',
          },
          {
            label: 'Тарифы',
            routerLink: 'tariffs',
          },
        ],
      },
    ]);
  }
}
