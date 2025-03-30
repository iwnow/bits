import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { useCrm } from 'crm-core';
import { PlaceBookingCalendarComponent } from 'crm/components/place-booking-calendar';
import { filter, map, switchMap } from 'rxjs';

@Component({
  selector: 'b-calendar-place-page',
  templateUrl: './calendar-place-page.component.html',
  styleUrls: ['./calendar-place-page.component.css'],
  standalone: true,
  imports: [PlaceBookingCalendarComponent, AsyncPipe],
})
export class CalendarPlacePageComponent implements OnInit {
  selectedPlaceId = signal(-1);

  crm = useCrm();
  route = inject(ActivatedRoute);
  place$ = this.route.params.pipe(
    map((p) => +p.placeId),
    filter((id) => id > 0),
    switchMap((id) => this.crm.server.manager.place(id))
  );

  ngOnInit() {}
}
