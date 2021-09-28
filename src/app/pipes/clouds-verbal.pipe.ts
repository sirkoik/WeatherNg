import { Pipe, PipeTransform } from '@angular/core';
import { WeatherService } from '../weather.service';

@Pipe({
  name: 'cloudsVerbal'
})
export class CloudsVerbalPipe implements PipeTransform {
  constructor(private weatherService: WeatherService) {}

  transform(cloudinessPct: number, ...args: unknown[]): string {
    const cloudiness = cloudinessPct / 100;

    // TODO in daytime, it's common to say "Sunny" instead of "Clear".
    // TODO Check to make sure if this is working - probably need a BehaviorSubject to subscribe to changes
    // https://forecast.weather.gov/glossary.php?letter=s
    const dayStatement = this.weatherService.isDayTime ? 'Sunny' : 'Clear';

    if (cloudiness < 1 / 8) return dayStatement;
    if (cloudiness >= 1 / 8 && cloudiness < 3 / 8)
      return `Mostly ${dayStatement}`;
    if (cloudiness >= 3 / 8 && cloudiness < 5 / 8) return 'Partly Cloudy';
    if (cloudiness >= 5 / 8 && cloudiness < 7 / 8) return 'Mostly Cloudy';
    return 'Cloudy';
  }
}
