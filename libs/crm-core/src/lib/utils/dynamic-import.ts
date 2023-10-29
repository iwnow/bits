export function dynamicImport(src: string) {
  return import(/* webpackIgnore: true */ src);
}
