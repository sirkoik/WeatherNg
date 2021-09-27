import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temperatureConvert'
})
export class TemperatureConvertPipe implements PipeTransform {
  transform(kelvinValue: number, to: string): number {
    switch (to) {
      case 'c':
        const valC = kelvinValue - 273.15;
        return valC;
      case 'f':
        const valF = (kelvinValue - 273.15) * 1.8 + 32;
        return valF;
      case 'k':
      default:
        return kelvinValue;
    }
  }
}
