import { Component, ElementRef, OnInit, inject } from '@angular/core';
import { viewDestroy } from 'crm/utils';
import { LayoutService } from './layout.service';
import { takeUntil } from 'rxjs';


@Component({
  selector: 'b-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  readonly destroy$ = viewDestroy();
  readonly layout = inject(LayoutService);
  readonly elRef = inject<ElementRef<HTMLElement>>(ElementRef);

  ngOnInit() {
    this.layout.sidebarVisible$.pipe(takeUntil(this.destroy$)).subscribe(v => {
      const sidebarVisibleClass = 'sidebar-open';
      if (v) {
          this.elRef.nativeElement.classList.add(sidebarVisibleClass);
      } else {
        this.elRef.nativeElement.classList.remove(sidebarVisibleClass);
      }
  });
  }

}
