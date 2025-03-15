import { Component, HostBinding, input, output, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import {
  ContentTabBarComponent,
  TabItem,
} from '../content-tab-bar/content-tab-bar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'b-ribbon-bar',
  templateUrl: './ribbon-bar.component.html',
  styleUrls: ['./ribbon-bar.component.scss'],
  standalone: true,
  imports: [ContentTabBarComponent, CommonModule],
})
export class RibbonBarComponent {
  tabs = signal([]);
  menu = signal([]);
  menuBtnClick = output<PointerEvent>();
  title = input('');

  @HostBinding('class.is-empty-menu')
  get isEmptyMenu() {
    return !this.menu()?.length;
  }

  setupRibbon(e: Partial<RibbonItems>) {
    Array.isArray(e?.tabs) && this.tabs.set(e.tabs);
    Array.isArray(e?.menu) && this.menu.set(e.menu);
  }

  clear() {
    this.tabs.set([]);
    this.menu.set([]);
  }

  onMenuBtnClick(e) {
    this.menuBtnClick.emit(e);
  }
}

export type RibbonItems = {
  tabs: Array<TabItem>;
  menu: MenuItem[];
};

export type RibbonTabs = RibbonItems['tabs'];
export type RibbonMenu = RibbonItems['menu'];
