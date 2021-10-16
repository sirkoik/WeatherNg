import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'speedConvert'
})
export class SpeedConvertPipe implements PipeTransform {
  // speed (input) is always assumed to be meters per second
  transform(speed: number, convertTo?: string): number {
    switch (convertTo) {
      case 'km/h':
        // m/s -> km/h
        return speed * 3.6;
      case 'mph':
        // m/s -> mph
        return speed * 2.236936;
      case 'mps':
      // m/s
      default:
        return speed;
    }
  }
}
