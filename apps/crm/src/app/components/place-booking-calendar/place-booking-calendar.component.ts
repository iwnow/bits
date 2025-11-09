import { Component, computed, input, OnInit, viewChild } from '@angular/core';
import { DTO, useCrm, useDestroyStream } from 'crm-core';
import {
  addDays,
  createArray,
  dateToISO,
  startOfDay,
  utcToZonedTime,
} from 'crm-utils';
import { DateFormatPipe, IsTodayPipe } from 'crm/pipes/date.pipes';
import { PlaceColorPipe } from 'crm/pipes/place-color.pipe';
import { PlaceBookingCalendarDayComponent } from './place-booking-calendar-day/place-booking-calendar-day.component';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, map, shareReplay, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'b-place-booking-calendar',
  templateUrl: './place-booking-calendar.component.html',
  styleUrls: ['./place-booking-calendar.component.scss'],
  standalone: true,
  imports: [
    AsyncPipe,
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
  destroy$ = useDestroyStream();
  crm = useCrm();

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
  dates$ = toObservable(this.dates);
  booking$ = toObservable(this.place).pipe(
    filter(Boolean),
    switchMap((place) => this.dates$.pipe(map((dates) => ({ dates, place })))),
    switchMap(({ dates, place }) => {
      const sorted = dates.sort((a, b) => a - b);
      const start = sorted[0],
        end = sorted[sorted.length - 1];
      return this.crm.server.manager
        .bookings({
          placeId: place.id,
          date_from: dateToISO(startOfDay(start)),
          date_to: dateToISO(addDays(startOfDay(end), 1)),
        })
        .pipe(map((bookings) => ({ bookings, dates, place })));
    }),
    map(({ bookings, dates, place }) => {
      return dates.map((date) => {
        const from = startOfDay(date);
        const to = addDays(startOfDay(date), 1);
        const placeTZ = this.tZone();
        const sliceData = bookings.filter((i) => {
          const i_tz_from = utcToZonedTime(i.date_from, placeTZ);
          const i_tz_to = utcToZonedTime(i.date_to, placeTZ);
          const i_f = new Date(i.date_from);
          const i_t = new Date(i.date_to);
          if (
            (i_tz_from >= from && i_tz_to <= to) ||
            (i_tz_from >= from && i_tz_to >= to && i_tz_from < to) ||
            (i_tz_from <= from && i_tz_to > from)
          ) {
            return true;
          }
          return false;
        });
        return {
          date,
          data: sliceData,
        };
      });
    }),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  ngOnInit() {}
}
