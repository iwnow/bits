import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DTO } from 'crm-core';
import { inheritResolvers } from 'crm-utils';
import { useAdminCommon } from 'crm/pages/admin-page/admin-common';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'b-admin-page-user-edit',
  templateUrl: './admin-page-user-edit.component.html',
  styleUrls: ['./admin-page-user-edit.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class AdminPageUserEditComponent implements OnInit {
  ad = useAdminCommon();

  ngOnInit(): void {
    const routeData = inheritResolvers(this.ad.route);
    const user: DTO.DTOUser = routeData.user;
    const userCompany: DTO.DTOCompanyUser[] = routeData.userCompany;
    userCompany.sort((a, b) => a.company_id - b.company_id);
    const menu: MenuItem[] = [
      {
        label: user.name,
        items: [
          {
            label: 'Инфо',
            routerLink: `users/edit/${user.id}/info`,
          },
        ],
      },
      {
        label: 'Компании',
        items: userCompany.map((i) => {
          return {
            label: i.company.name,
            routerLink: `users/edit/${user.id}/company/${i.company_id}`,
          };
        }),
      },
    ];
    this.ad.page.updateMenuItems(menu);
    this.ad.destroy$.subscribe(() => {
      this.ad.page.clearMenuItems();
    });
  }
}
