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
        path: '/clients',
        icon: 'users',
      },
      {
        path: '/calendar',
        icon: 'calendar',
      },
      {
        path: '/orders',
        icon: 'check-circle',
      },
      {
        path: '/admin',
        icon: 'cog',
      },
    ];
  }

  severityValue(item: MenuItem) {
    return this.router.isActive(item.path, {
      paths: 'subset',
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
