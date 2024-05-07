import { Component, output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'b-content-tab-bar',
  templateUrl: './content-tab-bar.component.html',
  styleUrls: ['./content-tab-bar.component.scss'],
  standalone: true,
  imports: [ButtonModule, MenubarModule],
})
export class ContentTabBarComponent {
  menuBtnClick = output<PointerEvent>();

  items: MenuItem[] = [
    {
      label: 'Добавить',
      icon: 'pi pi-plus',
    },
    {
      label: 'Features',
      icon: 'pi pi-star',
    },
    {
      label: 'Projects',
      icon: 'pi pi-search',
      items: [
        {
          label: 'Components',
          icon: 'pi pi-bolt',
        },
        {
          label: 'Blocks',
          icon: 'pi pi-server',
        },
        {
          label: 'UI Kit',
          icon: 'pi pi-pencil',
        },
        {
          label: 'Templates',
          icon: 'pi pi-palette',
          items: [
            {
              label: 'Apollo',
              icon: 'pi pi-palette',
            },
            {
              label: 'Ultima',
              icon: 'pi pi-palette',
            },
          ],
        },
      ],
    },
    {
      label: 'Contact',
      icon: 'pi pi-envelope',
    },
  ];

  onMenuBtnClick(e) {
    this.menuBtnClick.emit(e);
  }
}
