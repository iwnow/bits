import { Component, OnInit, signal } from '@angular/core';
import { PlaceBookingCalendarComponent } from 'crm/components/place-booking-calendar';

@Component({
  selector: 'b-calendar-place-page',
  templateUrl: './calendar-place-page.component.html',
  styleUrls: ['./calendar-place-page.component.css'],
  standalone: true,
  imports: [PlaceBookingCalendarComponent],
})
export class CalendarPlacePageComponent implements OnInit {
  selectedPlaceId = signal(-1);

  ngOnInit() {}
}
