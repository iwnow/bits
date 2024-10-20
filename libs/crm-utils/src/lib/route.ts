import { ActivatedRoute, Params } from '@angular/router';

export function inheritResolvers(route: ActivatedRoute) {
  return inheritResolversInternal(route);
}

function inheritResolversInternal(
  route: ActivatedRoute | null,
  data?: Record<string, any>
) {
  data = data || route?.snapshot.data || {};
  if (!route || route === route.root) {
    return data;
  }
  const parent = route.parent?.snapshot.data || {};
  return inheritResolversInternal(route.parent, {
    ...parent,
    ...data,
  });
}

export function objectToQueryParams(o: Record<any, any>): Params {
  const ret: any = {};
  if (o && typeof o === 'object') {
    Object.entries(o).forEach(([k, v]) => {
      ret[k] = JSON.stringify(v);
    });
  }
  return ret;
}
