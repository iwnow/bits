import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, distinctUntilChanged, map } from 'rxjs';

export type LyoutState = {
    sidebarVisible: boolean;
}

@Injectable({providedIn: 'root'})
export class LayoutService {
    
    protected state$ = new BehaviorSubject<LyoutState>({
        sidebarVisible: true,
    });

    readonly sidebarVisible$ = this.fromState(s => s.sidebarVisible);

    toggleSidebarVisible() {
        const state = this.state$.value;
        this.state$.next({
            ...state,
            sidebarVisible: !state.sidebarVisible,
        })
    }

    protected fromState<R>(mapper: (state: LyoutState) => R): Observable<R> {
        return this.state$.pipe(map(mapper), distinctUntilChanged());
    }
    
}