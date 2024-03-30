import { Injectable, inject } from '@angular/core';
import { CrmAuthLoginParams } from './contracts';
import { CrmServerService } from '../../server/server.service';
import { EventsBusService } from '../events/events.service';
import {
  EMPTY,
  catchError,
  exhaustMap,
  switchMap,
  tap,
  ignoreElements,
  BehaviorSubject,
  map,
  distinctUntilChanged,
  filter,
} from 'rxjs';
import {
  AuthLoginResult,
  AuthSessionInfoResult,
} from '../../server/auth.service';
import { localStorageGet, localStorageSet } from '../../utils/local-storage';
import { whenTrue } from '../../utils';

@Injectable({ providedIn: 'root' })
export class CrmAuthService {
  protected server = inject(CrmServerService);
  protected bus = inject(EventsBusService);
  #loginResult$ = new BehaviorSubject<AuthLoginResult | undefined>(undefined);
  #sessionInfo$ = new BehaviorSubject<AuthSessionInfoResult | undefined>(
    undefined
  );
  #restoringSession$ = new BehaviorSubject(false);
  #loginResultKey = 'crm_auth_info';

  readonly EVENTS = this.bus.mapWithPrefix('auth/', {
    login: 'login',
    login_error: 'login_error',
    login_success: 'login_success',
  });
  readonly sessionUser$ = this.#sessionInfo$.pipe(whenTrue());

  get sessionUser() {
    return structuredClone(this.#sessionInfo$.value);
  }

  get loginResult() {
    return structuredClone(this.#loginResult$.value);
  }

  get isAuthenticated() {
    return !!this.sessionUser;
  }

  login(params: CrmAuthLoginParams) {
    this.bus.dispatch({
      name: this.EVENTS.login,
      detail: params,
    });
  }

  loginError() {
    return this.bus.on(this.EVENTS.login_error);
  }

  loginSuccess() {
    return this.bus.on(this.EVENTS.login_success);
  }

  authenticated() {
    if (this.#restoringSession$.value) {
      return this.#restoringSession$.pipe(
        filter((restoring) => !restoring),
        switchMap(() => this.#sessionInfo$),
        map((si) => !!si),
        distinctUntilChanged()
      );
    }
    return this.#sessionInfo$.pipe(
      map((si) => !!si),
      distinctUntilChanged()
    );
  }

  constructor() {
    this.tryRestoreSession();
    this.configProcessLogin();
  }

  protected tryRestoreSession() {
    const loginResult = localStorageGet<AuthLoginResult>(this.#loginResultKey);
    if (!loginResult) {
      return;
    }
    this.#loginResult$.next(loginResult);
    this.#restoringSession$.next(true);
    this.server.auth
      .refreshToken(this.loginResult!.refresh_token)
      .pipe(
        tap((e) => this.setLoginInfo(e)),
        switchMap(() => this.server.auth.sessionInfo()),
        tap((e) => this.#sessionInfo$.next(e))
      )
      .subscribe({
        error: (err) => {
          this.#restoringSession$.next(false);
          this.bus.dispatch({
            name: this.EVENTS.login_error,
            detail: {
              error: err,
            },
          });
        },
        complete: () => {
          this.#restoringSession$.next(false);
          this.bus.dispatch({
            name: this.EVENTS.login_success,
            detail: {
              user: this.sessionUser,
            },
          });
        },
      });
  }

  protected configProcessLogin() {
    this.bus
      .on<CrmAuthLoginParams>(this.EVENTS.login)
      .pipe(
        exhaustMap((e) =>
          this.server.auth.login(e.detail).pipe(
            tap((e) => this.setLoginInfo(e)),
            switchMap(() => this.server.auth.sessionInfo()),
            tap((e) => {
              this.#sessionInfo$.next(e);
              this.bus.dispatch({
                name: this.EVENTS.login_success,
                detail: {
                  user: this.sessionUser,
                },
              });
            }),
            catchError((err) => {
              this.bus.dispatch({
                name: this.EVENTS.login_error,
                detail: {
                  error: err,
                },
              });
              return EMPTY;
            })
          )
        )
      )
      .subscribe();
  }

  protected setLoginInfo(info: AuthLoginResult) {
    localStorageSet(this.#loginResultKey, info);
    this.#loginResult$.next(info);
  }
}
