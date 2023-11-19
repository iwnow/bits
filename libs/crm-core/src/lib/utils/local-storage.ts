export function localStorageGet<R>(key: string): R {
  return eval('(' + localStorage.getItem(key) + ')' as any) as R;
}

export function localStorageSet(key: string, data: any) {
  localStorage.setItem(key, JSON.stringify(data));
}
