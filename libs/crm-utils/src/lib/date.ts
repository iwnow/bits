import dayjs from 'dayjs';

export const dateUtil = (
  date: string | number | Date | dayjs.Dayjs | null | undefined
) => dayjs(date);
