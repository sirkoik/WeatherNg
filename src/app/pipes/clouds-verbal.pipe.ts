import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cloudsVerbal'
})
export class CloudsVerbalPipe implements PipeTransform {
  transform(cloudinessPct: number, isDaytime: boolean): string {
    const cloudiness = cloudinessPct / 100;

    // During daytime, it's common to say "Sunny" instead of "Clear".
    // https://forecast.weather.gov/glossary.php?letter=s
    const dayStatement = isDaytime ? 'Sunny' : 'Clear';

    if (cloudiness < 1 / 8) return dayStatement;
    if (cloudiness >= 1 / 8 && cloudiness < 3 / 8)
      return `Mostly ${dayStatement}`;
    if (cloudiness >= 3 / 8 && cloudiness < 5 / 8) return 'Partly Cloudy';
    if (cloudiness >= 5 / 8 && cloudiness < 7 / 8) return 'Mostly Cloudy';
    return 'Cloudy';
  }
}
