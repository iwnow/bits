import { Injectable, inject } from '@angular/core';
import { CrmServerService } from '../../server/server.service';
import { EventsBusService } from '../events/events.service';
import { CrmAuthService } from '../auth/auth.service';
import { BehaviorSubject, filter, Observable, of, switchMap } from 'rxjs';
import { whenFalse, whenTrue } from '../../utils';
import { DTOCompany, DTOCompanyObject } from '../../server/dto';

@Injectable({ providedIn: 'root' })
export class CrmCompanyService {
  protected server = inject(CrmServerService);
  protected auth = inject(CrmAuthService);
  protected bus = inject(EventsBusService);

  readonly EVENTS = this.bus.mapWithPrefix('company/', {
    loadUserCompanies: 'loadUserCompanies',
    loadUserCompaniesSuccess: 'loadUserCompaniesSuccess',
    selectActiveCompany: 'selectActiveCompany',
  });

  protected loading$ = new BehaviorSubject(false);
  protected companies$ = new BehaviorSubject<DTOCompany[]>([]);
  protected activeCompany$ = new BehaviorSubject<DTOCompany | null>(null);
  protected companyObjects = new Map<
    number,
    {
      loaded: BehaviorSubject<boolean>;
      objects: DTOCompanyObject[];
    }
  >();

  loadUserCompanies() {
    this.bus.dispatch({
      name: this.EVENTS.loadUserCompanies,
    });
  }

  selectCompanies() {
    return this.ofLoading(this.companies$);
  }

  activeCompany() {
    return this.ofLoading(this.activeCompany$);
  }

  selectActiveCompany(id: number) {
    this.bus.dispatch({
      name: this.EVENTS.selectActiveCompany,
      detail: { id },
    });
  }

  selectCompanyObjects(companyId: number) {
    const meta = this.companyObjects.get(companyId);
    if (meta?.loaded?.value) {
      return of(meta.objects);
    } else if (meta?.loaded?.value === false) {
      return meta?.loaded.pipe(
        whenTrue(),
        switchMap(() => of(meta.objects))
      );
    }
    const loaded = new BehaviorSubject(false);
    const objects: DTOCompanyObject[] = [];
    this.companyObjects.set(companyId, { loaded, objects });
    this.server.manager.companyObjects(companyId).subscribe((items) => {
      objects.push(...items);
      loaded.next(true);
    });
    return loaded.pipe(
      whenTrue(),
      switchMap(() => of(objects))
    );
  }

  protected ofLoading<T>(stream$: Observable<T>) {
    if (this.loading$.value)
      return this.loading$.pipe(
        whenFalse(),
        switchMap(() => stream$)
      );
    return stream$;
  }

  constructor() {
    this.bus.on(this.auth.EVENTS.login_success).subscribe(() => {
      this.loadUserCompanies();
    });
    this.bus.on(this.EVENTS.loadUserCompanies).subscribe((e) => {
      if (this.loading$.value) {
        return;
      }
      this.loading$.next(true);
      this.server.company.companies().subscribe({
        error: console.error,
        next: (companies) => {
          companies.sort((a, b) => a.id - b.id);
          this.companies$.next(companies);
          if (!this.activeCompany$.value && companies.length) {
            this.selectActiveCompany(companies[0].id);
          }
          this.bus.dispatch({
            name: this.EVENTS.loadUserCompaniesSuccess,
            detail: { companies },
          });
        },
        complete: () => {
          this.loading$.next(false);
        },
      });
    });
    this.bus
      .on<{ id: number }>(this.EVENTS.selectActiveCompany)
      .subscribe((e) => {
        const company = this.companies$.value.find((i) => i.id === e.detail.id);
        if (company) {
          this.activeCompany$.next(company);
        }
      });
  }
}
