import { Component, OnInit, inject } from '@angular/core';
import { viewDestroy } from 'crm-utils';
import { AdminPageService } from '../admin-page.service';
import { MenuItem } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { useAdminCommon } from '../admin-common';
import { first, forkJoin, map, switchMap, takeUntil } from 'rxjs';
import { DTO } from 'crm-core';

@Component({
  selector: 'b-admin-page-tariffs',
  templateUrl: './admin-page-tariffs.component.html',
  styleUrls: ['./admin-page-tariffs.component.scss'],
  standalone: true,
  imports: [RouterModule],
})
export class AdminPageTariffsComponent implements OnInit {
  destroy$ = viewDestroy();
  page = inject(AdminPageService);
  ad = useAdminCommon();

  ngOnInit() {
    this.page.updateRibbonMenu([
      {
        label: 'Создать',
        icon: 'pi pi-plus',
      },
    ]);
    this.ad.crm.company
      .selectCompanies()
      .pipe(
        switchMap((companies) => {
          const idx: Record<number, DTO.DTOCompany> = companies.reduce(
            (acc, cur) => {
              acc[cur.id] = cur;
              return acc;
            },
            {}
          );
          return forkJoin(
            companies.map((c) =>
              this.ad.crm.company.selectCompanyObjects(c.id).pipe(
                map((objects) => ({ company: idx[c.id], objects })),
                first()
              )
            )
          );
        })
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        const menu: MenuItem[] = [
          {
            label: 'Тарифы',
            items: [
              {
                label: 'Список',
                routerLink: `tariffs/list`,
              },
            ],
          },
          ...data
            .sort((a, b) => a.company.name.localeCompare(b.company.name))
            .map((c) => {
              return {
                label: c.company.name,
                items: c.objects
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .flatMap((o) => {
                    return o.places
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map((p, idx) => {
                        const item: MenuItem = {
                          label: p.name,
                          preHeaderLabel: idx === 0 ? o.name : null,
                          routerLink: `tariffs/p/${p.id}`,
                        };
                        return item;
                      });
                  }),
              };
            }),
        ];
        this.ad.page.updateMenuItems(menu);
      });

    this.ad.destroy$.subscribe(() => {
      this.ad.page.clearMenuItems();
    });
  }
}
