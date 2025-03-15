import { Component, input, OnInit } from '@angular/core';

@Component({
  selector: 'b-place-calendar',
  templateUrl: './place-calendar.component.html',
  styleUrls: ['./place-calendar.component.css'],
  standalone: true,
})
export class PlaceCalendarComponent implements OnInit {
  placeId = input.required<number>();

  ngOnInit() {}
}
