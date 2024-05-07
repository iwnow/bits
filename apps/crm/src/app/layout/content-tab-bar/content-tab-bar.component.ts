import { Component, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'b-content-tab-bar',
  templateUrl: './content-tab-bar.component.html',
  styleUrls: ['./content-tab-bar.component.scss'],
  standalone: true,
  imports: [ButtonModule, MenubarModule, RouterModule],
})
export class ContentTabBarComponent {
  menuBtnClick = output<PointerEvent>();

  tabs = input<TabItem[]>([]);
  menu = input<MenuItem[]>([]);

  onMenuBtnClick(e) {
    this.menuBtnClick.emit(e);
  }
}

export type TabItem = {
  id?: any;
  label: string;
  routerLink?: string;
  action?: (...args) => void;
};
