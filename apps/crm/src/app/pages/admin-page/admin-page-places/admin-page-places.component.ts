import { Component, OnInit, inject } from '@angular/core';
import { viewDestroy } from 'crm-utils';
import { AdminPageService } from '../admin-page.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'b-admin-page-places',
  templateUrl: './admin-page-places.component.html',
  styleUrls: ['./admin-page-places.component.scss'],
  standalone: true,
  imports: [RouterModule],
})
export class AdminPagePlacesComponent implements OnInit {
  destroy$ = viewDestroy();
  page = inject(AdminPageService);

  ngOnInit() {
    
  }
}
