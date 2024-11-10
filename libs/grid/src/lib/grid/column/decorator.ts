import { BGridCol } from '../grid.api';

const symColumn = Symbol();

export function column(desc?: BGridCol) {
  return (ctor, field) => {
    ctor[symColumn] = ctor[symColumn] || {
      fields: [],
    };
    const cols = ctor[symColumn].fields;
    const colSettings = defaultColumn();
    cols.push({
      field,
      ...colSettings,
      ...(desc || {}),
    });
  };
}

export function columnsFromClass(type: any) {
  const proto = type?.prototype;
  if (!proto[symColumn]) {
    return [];
  }
  const fields = proto[symColumn].fields;
  return fields;
}

function defaultColumn(): BGridCol {
  return {
    sortable: false,
    floatingFilter: true,
  };
}

export function jsonColumnDesc(desc: Partial<BGridCol>) {
  return column({
    cellStyle: {
      whiteSpace: 'pre',
    },
    wrapText: true,
    autoHeight: true,
    ...desc,
  });
}
