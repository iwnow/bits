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
import { provideFrmsComponents } from 'bits-frms';
import { crmFrmComponents } from 'crm/core/frms.components';
import { RippleModule } from 'primeng/ripple';
import { BadgeModule } from 'primeng/badge';

@Component({
  selector: 'b-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MenuModule,
    RibbonBarComponent,
    BadgeModule,
    RippleModule,
  ],
  providers: [AdminPageService, provideFrmsComponents(crmFrmComponents)],
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
  ribbonMenuAboveContent = true;

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
        label: 'Площадки',
        routerLink: 'places',
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
