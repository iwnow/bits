export function objectExcludeProps<T extends Record<any, any>>(
  o: T,
  ...props: Array<keyof T>
): Partial<T> {
  if (!o) {
    return o;
  }
  props.forEach((p) => delete o[p]);
  return o;
}

export function objectExcludePropsRetNew<T extends Record<any, any>>(
  o: T,
  ...props: Array<keyof T>
): Partial<T> {
  if (!o) {
    return o;
  }
  const r = Object.entries(o).reduce((acc, [k, v]) => {
    if (!props.includes(k)) {
      acc[k] = v;
    }
    return acc;
  }, {} as any);
  return r;
}

export function objectToSearchString(o: Record<any, any>): string {
  const keys = (o && Object.keys(o)) || [];
  if (keys.length === 0) {
    return '';
  }
  let search = '';
  const validTypes = ['string', 'number', 'bigint', 'boolean'];
  keys.forEach((key) => {
    const type = typeof o[key];
    const val = o[key];
    let searchPart = '';
    if (validTypes.includes(type)) {
      searchPart = `${key}=${String(val)}`;
    } else if (Array.isArray(val)) {
      const validValues = val.filter((v) => validTypes.includes(typeof v));
      searchPart = validValues.map((v) => `${key}=${String(v)}`).join('&');
    }
    if (search.length > 0 && search[search.length - 1] !== '&') {
      search += '&';
    }
    search += searchPart;
  });
  return search;
}

export function somePropsDefined<T>(o: T, ...props: Array<keyof T>): boolean {
  if (!o) {
    return false;
  }
  return props.some((p) => typeof o[p] !== 'undefined');
}

export function everyPropsDefined<T>(o: T, ...props: Array<keyof T>): boolean {
  if (!o) {
    return false;
  }
  return props.every((p) => typeof o[p] !== 'undefined');
}
