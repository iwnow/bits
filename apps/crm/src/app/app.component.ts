import { Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CrmClientService } from 'crm-core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'bits-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  readonly primengConfig = inject(PrimeNGConfig);
  readonly crm = inject(CrmClientService);
  readonly router = inject(Router);

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.crm.auth.logoutSuccess().subscribe(() => {
      this.router.navigate(['/entry']);
    });
  }
}
