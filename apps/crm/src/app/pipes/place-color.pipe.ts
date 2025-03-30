import { Pipe, PipeTransform } from '@angular/core';
import { DTO } from 'crm-core';
import { stringToHslColor } from 'crm-utils';

@Pipe({
  name: 'placeColor',
  standalone: true,
})
export class PlaceColorPipe implements PipeTransform {
  transform(
    place: DTO.DTOPlace,
    saturationPercent = 50,
    lightnessPercent = 40
  ): any {
    const name =
      place.dimension_length && place.dimension_width
        ? `${place.name}${place.dimension_length}${place.dimension_width}${place.id}`
        : `${place.name}${place.id}`;
    return stringToHslColor(name, saturationPercent, lightnessPercent);
  }
}
