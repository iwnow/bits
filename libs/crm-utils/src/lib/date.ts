import dayjs from 'dayjs';
import customParse from 'dayjs/plugin/customParseFormat';
import { fromZonedTime, toZonedTime } from 'date-fns-tz';
import { ru } from 'date-fns/locale';
import {
  format,
  getYear,
  getMonth,
  getDate,
  startOfDay,
  setHours,
  setMinutes,
  startOfWeek,
  setDefaultOptions,
  parse,
} from 'date-fns';
// DAYJS
dayjs.extend(customParse);
export const dateUtil = dayjs;
// DATE-FNS
setDefaultOptions({
  locale: ru,
});

export {
  addDays,
  startOfDay,
  subDays,
  setHours,
  setMinutes,
  addMonths,
  getHours,
  getMinutes,
  setMilliseconds,
  setSeconds,
  getUnixTime,
  parse as parseDate,
  isValid as isDateValid,
} from 'date-fns';

export function getStartOfWeek(date: Date | number) {
  return startOfWeek(date, { weekStartsOn: 1 });
}

export function formatDate(
  date: Date | number | string,
  fmt: string,
  tz?: string
) {
  if (tz) {
    date = utcToZonedTime(date, tz);
  }
  if (typeof date === 'string') {
    date = new Date(date);
  }
  return format(date, fmt, { locale: ru });
}

export function formatDateInterval(
  dateFrom: Date | string | number,
  dateTo: Date | string | number,
  timeZone?: string,
  endWithoutDate = false
) {
  const df = timeZone ? utcToZonedTime(dateFrom, timeZone) : dateFrom;
  const dt = timeZone ? utcToZonedTime(dateTo, timeZone) : dateTo;
  return `${formatDate(df, 'dd MMMM HH:mm')} - ${formatDate(
    dt,
    endWithoutDate ? 'HH:mm' : 'dd MMMM HH:mm'
  )}`;
}

export function formatDateTimeSimple(
  d: Date | number | string,
  timeZone?: string
) {
  d = timeZone ? utcToZonedTime(d, timeZone) : d;
  return formatDate(d, 'dd MMMM HH:mm');
}

export function zonedTimeToUtc(date: Date | string | number, timeZone: string) {
  return fromZonedTime(date, timeZone);
}

export function toUTC(date: Date) {
  return Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  );
}

export function utcToZonedTime(date: Date | string | number, timeZone: string) {
  return toZonedTime(date, timeZone);
}

export function isToday(date: number | Date | string) {
  const dd = new Date(date);
  const now = Date.now();
  return (
    getYear(dd) === getYear(now) &&
    getMonth(dd) === getMonth(now) &&
    getDate(dd) === getDate(now)
  );
}

export function dateToISO(date: number | Date) {
  date = date instanceof Date ? date : new Date(date);
  return date.toISOString();
}

export function timeInterval30min() {
  const times = [];
  for (let hour = 0; hour < 24; hour++) {
    times.push(`${hour}:00`.padStart(5, '0'));
    times.push(`${hour}:30`.padStart(5, '0'));
  }
  return times;
}

export function hourInterval30min() {
  const times = [];
  for (let hour = 0; hour < 24; hour = hour + 0.5) {
    times.push(hour);
  }
  return times;
}

export function hourIntervalMinutes(mm = 30) {
  if (mm <= 0 || mm > 60) {
    throw new Error('Invalid minutes params, must be from 0 to 60');
  }
  const delta = Math.round(mm) / 60;
  const times = [];
  for (let hour = 0; hour < 24; hour = hour + delta) {
    times.push(hour);
  }
  return times;
}

export function timeInterval30minToDate(date: Date | number, hourTime: string) {
  const [hours, mins] = hourTime.split(':');
  const result = setMinutes(
    setHours(startOfDay(date), parseInt(hours)),
    parseInt(mins)
  );
  return result;
}

export function setHoursFloat(date: Date | number, hourFloat: number) {
  const hour = Math.floor(hourFloat);
  const minutes = (hourFloat % 1) * 60;
  return setMinutes(setHours(date, hour), minutes);
}

export function pythonDay(date: Date | number) {
  if (typeof date === 'number' && date <= 6) {
    return date - 1 === -1 ? 6 : date - 1;
  }
  date = date instanceof Date ? date : new Date(date);
  const day = date.getDay() - 1;
  return day === -1 ? 6 : day;
}

export function hourToSelectView(hour: number) {
  const minutes = String((hour % 1) * 60).padStart(2, '0');
  const hours = String(Math.floor(hour)).padStart(2, '0');
  return `${hours}:${minutes}`;
}

export function sameDate(a: Date | number | string, b: Date | number | string) {
  if (!a || !b) {
    return false;
  }
  const ad = new Date(a),
    bd = new Date(b);
  return ad.getDate() === bd.getDate();
}

export function getDayAbsoluteMinute(now = new Date()) {
  const h = now.getHours();
  const m = now.getMinutes();
  return h * 60 + m;
}
