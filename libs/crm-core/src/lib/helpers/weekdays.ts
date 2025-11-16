const WEEKDAYS = [
  { name: 'Пн', value: 0 },
  { name: 'Вт', value: 1 },
  { name: 'Ср', value: 2 },
  { name: 'Чт', value: 3 },
  { name: 'Пт', value: 4 },
  { name: 'Сб', value: 5 },
  { name: 'Вс', value: 6 },
];

const WEEKDAYS_ID_NAME: Record<number, string> = WEEKDAYS.reduce(
  (acc, cur) => ((acc[cur.value] = cur.name), acc),
  {}
);

const HELPER_WEEKDAYS = {
  get WEEKDAYS() {
    return structuredClone(WEEKDAYS);
  },
  get WEEKDAYS_ID_NAME() {
    return structuredClone(WEEKDAYS_ID_NAME);
  },
};

export { HELPER_WEEKDAYS };
