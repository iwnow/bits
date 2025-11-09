import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { DOMAIN, DTO, useCrm, useDestroyStream } from 'crm-core';
import {
  addDays,
  createArray,
  dateToISO,
  formatDate,
  getDayAbsoluteMinute,
  isDateValid,
  isToday,
  startOfDay,
  utcToZonedTime,
} from 'crm-utils';
import {
  combineLatest,
  filter,
  from,
  interval,
  switchMap,
  takeUntil,
} from 'rxjs';

@Component({
  selector: 'b-place-booking-calendar-day',
  templateUrl: './place-booking-calendar-day.component.html',
  styleUrls: ['./place-booking-calendar-day.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaceBookingCalendarDayComponent implements OnInit {
  date = input<Date | number>(null);
  height = input(960);
  place = input.required<DTO.DTOPlace>();
  showTimeMarker = input(true);
  showHours = input(true);
  timeMarkerFullWidth = input(false);
  tZone = input('Europe/Moscow');
  bookings = input([]);

  destroy$ = useDestroyStream();
  crm = useCrm();
  container: HTMLElement = null;
  hours = createArray(24, (index) => ({
    hour: index,
    hourView: `${String(index).padStart(2, '0')}:00`,
  }));
  dateView = computed(() => {
    const date = this.date();
    const view = formatDate(date, 'dd MMM');
    return view;
  });
  hourHeight = computed(() => this.height() / 24);
  minuteHeight = computed(() => this.height() / (24 * 60));
  areaCols = computed(() =>
    this.place()?.is_sectioned
      ? this.place().section_columns * this.place().section_rows
      : 1
  );
  dayIsToday = signal(false);
  dayMinute = signal(getDayAbsoluteMinute());
  startDate = computed(() => startOfDay(this.date()));
  endDate = computed(() => addDays(this.startDate(), 1));
  bookingsView = signal([]);
  containerStyles = computed(() => {
    const styles = `height: ${this.height()}px;
      --hour-height: ${this.hourHeight()}px;
      --minute-height: ${this.minuteHeight()}px;
      --day-absolute-minute: ${this.dayMinute()};
    `;
    return styles;
  });

  activitiesEmoji = {
    1: { emoji: '⚽' },
    3: { emoji: '🏀' },
    4: { emoji: '🏐' },
    5: { emoji: '💃' },
    6: { emoji: '🤼' },
    7: { emoji: '🎯' },
    8: { emoji: '🧘' },
    9: { emoji: '🎥' },
  };
  orderStateBg = {
    [DOMAIN.OrderState.new]: 'bg-primary',
    [DOMAIN.OrderState.WAIT_PREPAYM]: 'bg-warning',
    [DOMAIN.OrderState.WAIT_CONF]: 'bg-warning',
    [DOMAIN.OrderState.confirmed]: 'bg-accent',
    [DOMAIN.OrderState.payed]: 'bg-success',
    [DOMAIN.OrderState.cancel]: 'bg-error',
  };
  date$ = toObservable(this.date);
  place$ = toObservable(this.place);
  bookings$ = toObservable(this.bookings);

  ngOnInit() {
    this.dayIsToday.set(isToday(this.date()));
    interval(60_000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.dayIsToday.set(isToday(this.date()));
        this.dayMinute.set(getDayAbsoluteMinute());
      });

    // combineLatest({
    //   date: this.date$,
    //   place: this.place$,
    // })
    //   .pipe(
    //     filter((e) => e.place?.id > 0 && isDateValid(e.date)),
    //     switchMap((e) => {
    //       return from(
    //         this.crm.server.manager.bookingsPromise({
    //           placeId: e.place.id,
    //           date_from: dateToISO(startOfDay(e.date)),
    //           date_to: dateToISO(addDays(startOfDay(e.date), 1)),
    //         })
    //       );
    //     }),
    //     takeUntil(this.destroy$)
    //   )
    //   .subscribe((bookings) => {
    //     this.updateBoolingsView(bookings);
    //   });

    this.bookings$.pipe(takeUntil(this.destroy$)).subscribe((bookings) => {
      this.updateBoolingsView(bookings);
    });
  }

  updateBoolingsView(bookings) {
    const booksView = bookings
      .map((booking, idx) => {
        const tzFrom = utcToZonedTime(booking.date_from, this.tZone());
        const tzTo = utcToZonedTime(booking.date_to, this.tZone());
        const msDiff = tzTo.getTime() - tzFrom.getTime();
        const dayMinutesFrom = tzFrom.getHours() * 60 + tzFrom.getMinutes();
        const dayMinutesTo = dayMinutesFrom + Math.round(msDiff / (60 * 1000));
        return {
          tzFrom,
          tzTo,
          fromMs: tzFrom.getTime(),
          toMs: tzTo.getTime(),
          booking,
          order: booking.order_product?.order,
          source_id: booking.order_product?.order?.source_id,
          dayMinutesFrom,
          dayMinutesTo,
          comment: booking?.comment || booking.order_product?.order?.comment,
          $left: 0,
          sectionName: booking.section?.name,
          activityId: booking.activity_id,
        };
      })
      .sort((a, b) => {
        return a.fromMs - b.fromMs;
      });
    const place = this.place();
    const areaCols = this.areaCols();
    if (place?.is_sectioned) {
      // add left padding collisions
      for (let i = 0; i < booksView.length; i++) {
        const cur = booksView[i];
        cur.$left = cur.$left || 0;
        const curColsArea = this.calcAreaBook(cur.booking);
        if (cur.$left + curColsArea > areaCols) {
          cur.$left = 0;
        }
        for (let j = i + 1; j < booksView.length; j++) {
          const nex = booksView[j];
          //time---------------------------------------->
          //nex: -----     -----    --  -------  ---
          //cur:  -----  -----    -----  -----   ---
          const intersected =
            (nex.toMs > cur.fromMs && nex.toMs <= cur.toMs) ||
            (nex.fromMs > cur.fromMs && nex.fromMs < cur.toMs) ||
            cur.fromMs === nex.fromMs ||
            cur.toMs === nex.toMs;
          if (intersected) {
            nex.$left = cur.$left + curColsArea;
          }
        }
      }
    }
    this.bookingsView.set(booksView);
  }

  calcAreaBook(booking) {
    const areaCols = this.areaCols();
    if (!booking.section) {
      return areaCols;
    }
    return (
      (booking.section.column_end - booking.section.column_start + 1) *
      (booking.section.row_end - booking.section.row_start + 1)
    );
  }

  bookingViewStyles(bookingView) {
    return `
			--booking-day-minutes-from: ${bookingView.dayMinutesFrom};
			--booking-day-minutes-to: ${bookingView.dayMinutesTo};
			--booking-size: ${bookingView.booking.size || 100};
			--area-cols: ${this.areaCols()};
			--area-book: ${this.calcAreaBook(bookingView.booking)};
			--area-left-pad: ${bookingView.$left || 0}
			`;
  }

  getOrderBgClass(stateId: number) {
    return this.orderStateBg[stateId];
  }
}
