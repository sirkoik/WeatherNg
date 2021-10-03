import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'speedConvert'
})
export class SpeedConvertPipe implements PipeTransform {
  transform(speed: number, convertTo: string, places: number): number {
    const places10 = Math.pow(10, places);

    switch (convertTo) {
      case 'kmh':
        return Math.round(places10 * speed * 3.6) / places10;
      case 'mps':
      default:
        return speed;
    }
  }
}
