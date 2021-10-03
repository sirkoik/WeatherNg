import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { WeatherService } from './weather.service';
import { WeatherCondition } from './WeatherCondition';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, OnDestroy {
  loading = true;

  url = '';
  temperature = 0;
  temperatureFeels = 0;
  clouds = 0;
  weatherConditions: WeatherCondition[] = [];
  wind = {
    speed: 0,
    direction: ''
  };

  showTheCredits = false;

  // subscribe to the weather http call Observable
  weatherSubscription!: Subscription;

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.weatherSubscription = this.weatherService
      .fetchWeather('onecall')
      .subscribe(response => this.populateWeather(response));
  }

  ngOnDestroy() {
    this.weatherSubscription.unsubscribe();
  }

  // populateWeather: update the GUI with weather data
  // retrieved from the server.
  populateWeather(response: any) {
    const cur = response.current;

    this.temperature = cur.temp;
    this.temperatureFeels = cur.feels_like;
    this.clouds = cur.clouds;
    this.weatherConditions = cur.weather;
    this.wind = {
      speed: cur.wind_speed,
      direction: cur.wind_deg
    };

    this.loading = false;
  }

  showCredits(show: boolean) {
    this.showTheCredits = show;
  }
}
