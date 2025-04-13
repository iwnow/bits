import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'b-admin-page-tariff-edit',
  templateUrl: './admin-page-tariff-edit.component.html',
  styleUrls: ['./admin-page-tariff-edit.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class AdminPageTariffEditComponent implements OnInit {
  ngOnInit() {}
}
