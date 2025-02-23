import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'b-admin-page-place-edit',
  templateUrl: './admin-page-place-edit.component.html',
  styleUrls: ['./admin-page-place-edit.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class AdminPagePlaceEditComponent implements OnInit {
  ngOnInit() {}
}
