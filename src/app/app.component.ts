import {
  Component,
  OnDestroy,
  OnInit,
  SystemJsNgModuleLoader
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { RefreshIndicatorService } from './services/refresh-indicator.service';
import { WeatherService } from './services/weather.service';
import { WeatherCondition } from './types/WeatherCondition';
import { WeatherData } from './types/WeatherData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, OnDestroy {
  loading = true;

  // empty WeatherData object that is populated in the fetchWeater response.
  weatherData: WeatherData = {
    cityName: 'London (default)',
    temperature: 0,
    temperatureFeels: 0,
    cloudCover: 0,
    humidity: 0,
    sun: {
      sunrise: 0,
      sunset: 0
    },
    uvi: 0,
    wind: {
      speed: 0,
      direction: 0
    },
    weatherConditions: []
  };

  showTheCredits = false;

  // subscribe to the weather http call Observable
  weatherSubscription!: Subscription;
  dayNightSubscription!: Subscription;

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    // subscribe to the continuous weather fetching Observable
    this.weatherSubscription = this.weatherService
      .fetchWeather('onecall')
      .subscribe(response => this.populateWeather(response));

    // update the day/night state by listening to an event that is emitted
    // when the day/night data is updated from the server.
    this.dayNightSubscription = this.weatherService.updateDayNight.subscribe(
      isDay => {
        console.log('isDay?', isDay);
        document.body.className = isDay ? 'daytime-bg' : 'nighttime-bg';
      }
    );
  }

  ngOnDestroy() {
    this.weatherSubscription.unsubscribe();
    this.dayNightSubscription.unsubscribe();
  }

  // populateWeather: update the GUI with weather data
  // retrieved from the server.
  populateWeather(responses: any) {
    console.log('AppComponent: populateWeather', responses);

    // locationIQ API
    this.weatherData.cityName = responses[0].address.city;

    // OpenWeatherMap one call API
    const cur = responses[1].current;

    this.weatherData.temperature = cur.temp;
    this.weatherData.temperatureFeels = cur.feels_like;
    this.weatherData.cloudCover = cur.clouds;
    this.weatherData.humidity = cur.humidity;

    this.weatherData.sun = {
      sunrise: cur.sunrise * 1000,
      sunset: cur.sunset * 1000
    };

    this.weatherData.weatherConditions = cur.weather;
    this.weatherData.wind = {
      speed: cur.wind_speed,
      direction: cur.wind_deg
    };
    if (cur.wind_gust) this.weatherData.wind.gust = cur.wind_gust;
    this.weatherData.uvi = cur.uvi;

    this.loading = false;
  }

  showCredits(show: boolean) {
    this.showTheCredits = show;
  }
}
