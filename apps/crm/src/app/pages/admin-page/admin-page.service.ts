import { Injectable } from '@angular/core';
import type { AdminPageComponent } from './admin-page.component';
import {
  RibbonMenu,
  RibbonTabs,
} from 'crm/layout/ribbon-bar/ribbon-bar.component';
import { MenuItem } from 'primeng/api';

@Injectable()
export class AdminPageService {
  protected cmp: AdminPageComponent;

  linkComponent(c: AdminPageComponent) {
    if (c && !this.cmp) {
      this.cmp = c;
    }
  }

  updateRibbonMenu(menu: RibbonMenu) {
    this.cmp?.updateRibbonMenu(menu);
  }

  updateRibbonTabs(tabs: RibbonTabs) {
    this.cmp?.updateRibbonTabs(tabs);
  }

  updateMenuItems(items: MenuItem[]) {
    this.cmp?.updateMenuItems(items);
  }

  clearRibbonMenu() {
    this.cmp?.ribbon?.menu.set([]);
  }

  clearMenuItems() {
    this.cmp?.updateMenuItems([]);
  }
}
