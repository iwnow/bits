import { Component, OnInit, signal } from '@angular/core';
import { PlaceCalendarComponent } from '../place-calendar/place-calendar.component';

@Component({
  selector: 'b-calendar-place-page',
  templateUrl: './calendar-place-page.component.html',
  styleUrls: ['./calendar-place-page.component.css'],
  standalone: true,
  imports: [PlaceCalendarComponent],
})
export class CalendarPlacePageComponent implements OnInit {
  selectedPlaceId = signal(-1);

  ngOnInit() {}
}
