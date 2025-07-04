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
          ...data.map((c) => {
            return {
              label: c.company.name,
              items: c.objects.flatMap((o) => {
                return o.places.map((p) => {
                  return {
                    label: p.name,
                  };
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
