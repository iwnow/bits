import { CommonModule } from '@angular/common';
import {
  Component,
  HostBinding,
  OnInit,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import {
  RibbonBarComponent,
  RibbonMenu,
  RibbonTabs,
} from 'crm/layout/ribbon-bar/ribbon-bar.component';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { AdminPageService } from './admin-page.service';
import { waitFor } from 'crm-utils';

@Component({
  selector: 'b-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
  standalone: true,
  imports: [CommonModule, MenuModule, RibbonBarComponent],
  providers: [AdminPageService],
})
export class AdminPageComponent implements OnInit {
  menuItems = signal<MenuItem[]>([]);
  menuOpened = signal(true);
  aps = inject(AdminPageService);

  @HostBinding('class.menu-opened')
  get isMenuOpened() {
    if (!this.menuItems().length) {
      return false;
    }
    return this.menuOpened();
  }

  @ViewChild(RibbonBarComponent)
  ribbon: RibbonBarComponent;

  @HostBinding('class.ribbon-menu-above-content')
  ribbonMenuAboveContent = false;

  ngOnInit() {
    this.aps.linkComponent(this);
    this.updateRibbonTabs([
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
    ]);
  }

  toggleMenuOpened() {
    this.menuOpened.set(!this.menuOpened());
  }

  updateMenuItems(items: MenuItem[]) {
    this.menuItems.set(items);
  }

  updateRibbonTabs(tabs: RibbonTabs) {
    waitFor(
      () => !!this.ribbon,
      () => {
        this.ribbon.setupRibbon({
          tabs,
        });
      }
    );
  }

  updateRibbonMenu(menu: RibbonMenu) {
    waitFor(
      () => !!this.ribbon,
      () => {
        this.ribbon.setupRibbon({
          menu,
        });
      }
    );
  }
}
