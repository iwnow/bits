import { Pipe, PipeTransform } from '@angular/core';
import { formatDate, isToday } from 'crm-utils';

@Pipe({
  name: 'dateFormat',
  standalone: true,
})
export class DateFormatPipe implements PipeTransform {
  transform(date: Date | number | string, format: string): any {
    return formatDate(date, format);
  }
}

@Pipe({
  name: 'isToday',
  standalone: true,
})
export class IsTodayPipe implements PipeTransform {
  transform(date: Date | number | string): any {
    return isToday(date);
  }
}
