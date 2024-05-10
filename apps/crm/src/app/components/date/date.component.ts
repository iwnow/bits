import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FrmsControlBaseComponent } from 'bits-frms';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'b-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css'],
  standalone: true,
  imports: [CalendarModule, ReactiveFormsModule],
})
export class DateComponent extends FrmsControlBaseComponent {}
