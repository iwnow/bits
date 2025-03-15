import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CrmClientService } from 'crm-core';

@Component({
  selector: 'b-left-bar',
  templateUrl: './left-bar.component.html',
  styleUrls: ['./left-bar.component.scss'],
})
export class LeftBarComponent {
  readonly router = inject(Router);
  readonly crm = inject(CrmClientService);
  readonly menuItems = this.createMenuItems();

  createMenuItems() {
    const menu = [
      {
        path: '/',
        icon: 'star',
        tooltip: 'Избранное',
        disabled: true,
      },
      {
        path: '/clients',
        icon: 'users',
        tooltip: 'Клиенты',
        disabled: true,
      },
      {
        path: '/crm/calendar',
        icon: 'calendar',
        tooltip: 'Календарь',
      },
      {
        path: '/orders',
        icon: 'check-circle',
        tooltip: 'Заказы',
        disabled: true,
      },
    ];
    if (this.crm.auth.isAdmin) {
      menu.push({
        path: '/admin',
        icon: 'cog',
        tooltip: 'Администрирование',
      });
    }
    return menu;
  }

  severityValue(item: MenuItem) {
    return this.isActive(item) ? 'primary' : 'secondary';
  }

  selectItem(item: MenuItem) {
    if (this.isActive(item)) {
      return;
    }
    this.router.navigate([item.path]);
  }

  isActive(item: MenuItem) {
    return this.router.isActive(item.path, {
      paths: item.path === '/' ? 'exact' : 'subset',
      queryParams: 'subset',
      fragment: 'ignored',
      matrixParams: 'ignored',
    });
  }
}

type MenuItem = ReturnType<
  typeof LeftBarComponent.prototype.createMenuItems
>[0];
