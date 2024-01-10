export function stringToHslColor(
  str: string,
  saturationPercent = 50,
  lightnessPercent = 30
) {
  let hash = 0;
  str = String(str);
  for (let i = 0; i < str.length; i++) {
    // tslint:disable-next-line:no-bitwise
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  const h = hash % 360;
  return (
    'hsl(' + h + ', ' + saturationPercent + '%, ' + lightnessPercent + '%)'
  );
}
