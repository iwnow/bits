/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { loggedInGuard } from './logged-in-guard';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

describe('Guards: LoggedIn', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [],
    });
  });

  it('should return UrlTree', () => {
    const mockRoute: ActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
    const mockRouteState: RouterStateSnapshot = {} as RouterStateSnapshot;

    const result = TestBed.runInInjectionContext(() =>
      loggedInGuard({ redirect: { commands: ['login'] } })(mockRoute, mockRouteState)
    );

    expect(result).toBeInstanceOf(UrlTree);
  });
});
