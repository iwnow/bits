import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'b-admin-page-object-edit',
  templateUrl: './admin-page-object-edit.component.html',
  styleUrls: ['./admin-page-object-edit.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class AdminPageObjectEditComponent implements OnInit {
  ngOnInit() {}
}
