import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'b-left-bar',
  templateUrl: './left-bar.component.html',
  styleUrls: ['./left-bar.component.scss'],
})
export class LeftBarComponent {
  readonly router = inject(Router);

  readonly menuItems = this.createMenuItems();

  createMenuItems() {
    return [
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
        path: '/calendar',
        icon: 'calendar',
        tooltip: 'Календарь',
        disabled: true,
      },
      {
        path: '/orders',
        icon: 'check-circle',
        tooltip: 'Заказы',
        disabled: true,
      },
      {
        path: '/admin',
        icon: 'cog',
        tooltip: 'Администрирование',
      },
    ];
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
