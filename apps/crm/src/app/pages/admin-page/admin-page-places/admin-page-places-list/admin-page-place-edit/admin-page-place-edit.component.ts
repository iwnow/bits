import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DTO } from 'crm-core';
import { inheritResolvers } from 'crm-utils';
import { useAdminCommon } from 'crm/pages/admin-page/admin-common';
import { MenuItem } from 'primeng/api';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'b-admin-page-place-edit',
  templateUrl: './admin-page-place-edit.component.html',
  styleUrls: ['./admin-page-place-edit.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class AdminPagePlaceEditComponent implements OnInit {
  ad = useAdminCommon();

  ngOnInit(): void {
    const routeData = inheritResolvers(this.ad.route);
    const place: DTO.DTOPlace = routeData.companyPlace;
    const menu: MenuItem[] = [
      {
        label: place.name,
        tooltipOptions: {
          tooltipLabel: `Площадка "${place.name}"`,
        },
        items: [
          {
            label: 'Инфо',
            routerLink: `places/edit/${place.id}/info`,
          },
          {
            label: 'Режим работы',
            routerLink: `places/edit/${place.id}/workscheds`,
          },
        ],
      },
    ];
    this.ad.page.updateMenuItems(menu);
    this.ad.destroy$.subscribe(() => {
      this.ad.page.clearMenuItems();
    });
  }
}
