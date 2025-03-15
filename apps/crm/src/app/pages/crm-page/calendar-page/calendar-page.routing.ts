import { Route } from '@angular/router';
import { CalendarPlacePageComponent } from './calendar-place-page/calendar-place-page.component';
import { CalendarPageComponent } from './calendar-page.component';

export const calendarPageRouting: Route[] = [
  {
    path: '',
    component: CalendarPageComponent,
    children: [
      {
        path: 'place/:placeId',
        component: CalendarPlacePageComponent,
      },
    ],
  },
];

export default calendarPageRouting;
