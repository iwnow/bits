import dayjs from 'dayjs';
import customParse from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParse);

export const dateUtil = dayjs;
