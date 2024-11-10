import { Component, ElementRef, NgZone, OnInit, inject } from '@angular/core';
import { viewDestroy } from 'crm/utils';
import { ConfirmationService, MessageService } from 'primeng/api';
import { map, takeUntil } from 'rxjs';
import { LayoutService } from './layout.service';

@Component({
  selector: 'b-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class LayoutComponent implements OnInit {
  readonly destroy$ = viewDestroy();
  readonly layout = inject(LayoutService);
  readonly elRef = inject<ElementRef<HTMLElement>>(ElementRef);
  readonly scrolled$ = inject(NgZone).run(() =>
    this.layout.documentScroll$.pipe(map((e) => e.scrolled))
  );

  ngOnInit() {
    this.layout.sidebarVisible$
      .pipe(takeUntil(this.destroy$))
      .subscribe((v) => {
        const sidebarVisibleClass = 'sidebar-open';
        if (v) {
          this.elRef.nativeElement.classList.add(sidebarVisibleClass);
        } else {
          this.elRef.nativeElement.classList.remove(sidebarVisibleClass);
        }
      });
  }
}
