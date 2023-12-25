import { DOCUMENT } from '@angular/common';
import { Injectable, NgZone, inject } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  distinctUntilChanged,
  fromEvent,
  map,
} from 'rxjs';

export type LyoutState = {
  sidebarVisible: boolean;
};

@Injectable({ providedIn: 'root' })
export class LayoutService {
  protected state$ = new BehaviorSubject<LyoutState>({
    sidebarVisible: true,
  });
  protected zone = inject(NgZone);

  readonly sidebarVisible$ = this.fromState((s) => s.sidebarVisible);
  readonly documentScroll$ = this.zone.runOutsideAngular(() =>
    fromEvent(inject(DOCUMENT), 'scroll').pipe(
      map((e) => {
        const target = e.target as Document;
        return {
          event: e,
          element: target.documentElement,
          scrolled: target.documentElement.scrollTop > 0,
        };
      })
    )
  );

  toggleSidebarVisible() {
    const state = this.state$.value;
    this.state$.next({
      ...state,
      sidebarVisible: !state.sidebarVisible,
    });
  }

  protected fromState<R>(mapper: (state: LyoutState) => R): Observable<R> {
    return this.state$.pipe(map(mapper), distinctUntilChanged());
  }
}
