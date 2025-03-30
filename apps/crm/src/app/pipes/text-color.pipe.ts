import { Pipe, PipeTransform } from '@angular/core';
import { stringToHslColor } from 'crm-utils';

@Pipe({
  name: 'textColor',
  standalone: true,
})
export class TextColorPipe implements PipeTransform {
  transform(
    text: string,
    saturationPercent?: number,
    lightnessPercent?: number
  ): any {
    return stringToHslColor(text, saturationPercent, lightnessPercent);
  }
}
