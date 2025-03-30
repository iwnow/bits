import { Component, computed, input, OnInit, viewChild } from '@angular/core';
import { DTO } from 'crm-core';
import { addDays, createArray } from 'crm-utils';
import { DateFormatPipe, IsTodayPipe } from 'crm/pipes/date.pipes';
import { PlaceColorPipe } from 'crm/pipes/place-color.pipe';
import { PlaceBookingCalendarDayComponent } from './place-booking-calendar-day/place-booking-calendar-day.component';

@Component({
  selector: 'b-place-booking-calendar',
  templateUrl: './place-booking-calendar.component.html',
  styleUrls: ['./place-booking-calendar.component.scss'],
  standalone: true,
  imports: [
    PlaceColorPipe,
    DateFormatPipe,
    IsTodayPipe,
    PlaceBookingCalendarDayComponent,
  ],
})
export class PlaceBookingCalendarComponent implements OnInit {
  place = input.required<DTO.DTOPlace>();
  places = input<DTO.DTOPlace[]>(null);
  weekHeight = input(48);
  dayHeightPx = input(1140);
  initialDay = input<number | Date>(Date.now());
  daysCount = input(7);
  position = input<'static' | 'absolute'>('static');
  showTimeMarker = input(true);
  tZone = input('Europe/Moscow');

  multiPlace = computed(() => {
    const place = this.place();
    const places = this.places();
    const multiPlace = !place && Array.isArray(places);
    return multiPlace;
  });
  styleContainer = computed(() => {
    const multiPlace = this.multiPlace();
    const position = this.position();
    const daysCount = this.daysCount();
    const placesCount = multiPlace ? this.places().length : 1;

    const styles = `
      position: ${position};
      --days-col-count: ${daysCount};
      --places-count: ${placesCount};
      --day-min-width: 200;
      --add-width: ${multiPlace ? '2.5rem' : '0px'};
    `;
    return styles;
  });

  daysContainer = viewChild('daysContainer');
  daysContainerHead = viewChild('daysContainerHead');
  placeHeaderContainer = viewChild('placeHeaderContainer');
  daysContainerScrollLeft = 0;

  dates = computed(() => {
    const initialDay = this.initialDay();
    const daysCount = this.daysCount();
    const days = createArray(daysCount, (idx) => addDays(initialDay, idx));
    return days;
  });

  ngOnInit() {}
}
