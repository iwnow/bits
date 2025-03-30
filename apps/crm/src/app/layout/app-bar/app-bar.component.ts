import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { LayoutService } from '../layout.service';
import { CrmClientService } from 'crm-core';
import { map, shareReplay, takeUntil } from 'rxjs';
import { viewDestroy } from 'crm/utils';
import { MenuItem, MessageService } from 'primeng/api';
import { stringToHslColor } from 'crm-utils';

@Component({
  selector: 'b-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppBarComponent implements OnInit {
  readonly layout = inject(LayoutService);
  readonly destroy$ = viewDestroy();
  readonly crm = inject(CrmClientService);
  readonly cdr = inject(ChangeDetectorRef);

  companies: any[] = [];
  selectedCompany: any = null;
  userName$ = this.crm.auth.sessionUser$.pipe(map((i) => i.name));
  userColorHslColor$ = this.userName$.pipe(
    map((name) => stringToHslColor(name || 'User', 60, 50)),
    shareReplay(1)
  );
  avatarLabel$ = this.userName$.pipe(
    map((name) => {
      const parts = name
        .split(' ')
        .map((i) => i.trim())
        .filter(Boolean);
      const label =
        (parts[0]?.[0] || 'U')?.toUpperCase() +
        (parts[1]?.[0] || '').toUpperCase();
      return label;
    }),
    shareReplay(1)
  );

  items: MenuItem[] = this.createMenuProfile();
  messageService = inject(MessageService);

  ngOnInit() {
    this.crm.company
      .selectCompanies()
      .pipe(takeUntil(this.destroy$))
      .subscribe((e) => {
        this.companies = e;
      });
    this.crm.company
      .activeCompany()
      .pipe(takeUntil(this.destroy$))
      .subscribe((active) => {
        this.selectedCompany = active;
        this.cdr.markForCheck();
      });
  }

  onCompanyChange(e) {
    this.crm.company.selectActiveCompany(this.selectedCompany.id);
  }

  createMenuProfile(): MenuItem[] {
    return [
      {
        label: 'Update',
        icon: 'pi pi-refresh',
        command: () => {
          this.update();
        },
      },
      {
        label: 'Delete',
        icon: 'pi pi-times',
        command: () => {
          this.delete();
        },
      },
      {
        label: 'Angular',
        icon: 'pi pi-external-link',
        url: 'http://angular.io',
      },
      {
        separator: true,
      },
      {
        label: 'Выход',
        icon: 'pi pi-fw pi-power-off',
        iconStyle: {
          color: 'var(--red-500)',
        },
        command: () => {
          this.crm.auth.logout();
        },
      },
    ];
  }

  update() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Data Updated',
    });
  }

  delete() {
    this.messageService.add({
      severity: 'warn',
      summary: 'Delete',
      detail: 'Data Deleted',
    });
  }
}
