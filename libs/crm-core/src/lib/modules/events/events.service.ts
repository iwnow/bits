import { Injectable } from '@angular/core';
import { Observable, Subject, filter, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EventsBusService {
  protected eventHub$ = new Subject<DispatchEvent>();

  on<R>(name: string, options?: unknown): Observable<EventData<R>> {
    return this.eventHub$.pipe(
      filter((e) => e?.name === name),
      map((e) => {
        const ev: EventData<R> = {
          name: e.name,
          detail: e.detail as R,
          options: options,
        };
        return ev;
      })
    );
  }

  dispatch(e: DispatchEvent) {
    if (!e?.name) {
      return;
    }
    if (!e.when) {
      this.eventHub$.next(e);
    } else if (e.when === 'nextTick') {
      setTimeout(() => {
        this.eventHub$.next(e);
      });
    } else if (e.when === 'endStack') {
      queueMicrotask(() => {
        this.eventHub$.next(e);
      });
    } else if (typeof e.when === 'number' && e.when > 0) {
      setTimeout(() => {
        this.eventHub$.next(e);
      }, e.when);
    } else if (e.when === 'nextAnimation') {
      requestAnimationFrame(() => {
        this.eventHub$.next(e);
      });
    }
  }

  mapWithPrefix<T>(prefix: string, eventObj: T) {
    let o: any = eventObj;
    Object.keys(o).forEach((k) => {
      o[k] = prefix + o[k];
    });
    return eventObj;
  }

  constructor() {
    this.eventHub$.subscribe((e) => {
      console.group('[DISPATCH]', e.name);
      console.log(e.detail);
      console.groupEnd();
    });
  }
}

export interface EventData<T> {
  name: string;
  detail: T;
  options?: unknown;
}

export interface DispatchEvent {
  name: string;
  detail?: unknown;
  when?: 'nextTick' | 'endStack' | 'nextAnimation' | number;
}
