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
  title = 'Weather, Angular edition';

  url = '';
  temperature = 0;
  clouds = 0;
  weatherConditions: WeatherCondition[] = [];
  wind = {
    speed: 0,
    direction: ''
  };

  // subscribe to the weather http call Observable
  weatherSubscription!: Subscription;

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.weatherSubscription = this.weatherService
      .getLoc()
      .subscribe(response => {
        this.weatherService
          .fetchWeather(
            'onecall',
            response.coords.latitude,
            response.coords.longitude
          )
          .subscribe(response => {
            const cur = response.current;

            this.temperature = cur.temp;
            this.clouds = cur.clouds;
            this.weatherConditions = cur.weather;
            this.wind = {
              speed: cur.wind_speed,
              direction: cur.wind_deg
            };
          });
      });
  }

  ngOnDestroy() {
    this.weatherSubscription.unsubscribe();
  }
}
