import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'speedConvert'
})
export class SpeedConvertPipe implements PipeTransform {
  transform(speed: number, convertTo: string): number {
    switch (convertTo) {
      case 'khm':
        return (speed * 1000) / 60;
      case 'mps':
      default:
        return speed;
    }
  }
}
