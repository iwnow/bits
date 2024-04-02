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
      },
      {
        path: '/clients',
        icon: 'users',
        tooltip: 'Клиенты',
      },
      {
        path: '/calendar',
        icon: 'calendar',
        tooltip: 'Календарь',
      },
      {
        path: '/orders',
        icon: 'check-circle',
        tooltip: 'Заказы',
      },
      {
        path: '/admin',
        icon: 'cog',
        tooltip: 'Администрирование',
      },
    ];
  }

  severityValue(item: MenuItem) {
    return this.router.isActive(item.path, {
      paths: item.path === '/' ? 'exact' : 'subset',
      queryParams: 'subset',
      fragment: 'ignored',
      matrixParams: 'ignored',
    })
      ? 'primary'
      : 'secondary';
  }

  selectItem(item: MenuItem) {
    this.router.navigate([item.path]);
  }
}

type MenuItem = ReturnType<
  typeof LeftBarComponent.prototype.createMenuItems
>[0];
