import platform from './platform';

let baseHref = '/';
if (platform.isBrowser) {
  const href = document.querySelector('base')?.href ?? baseHref;
  baseHref = href.replace(location.origin, '');
}

export const getBaseHref = () => baseHref;
