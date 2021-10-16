import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { WeatherState } from './app.module';
import { WeatherService } from './services/weather.service';
import { WeatherData } from './types/WeatherData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, OnDestroy {
  loading = true;
  isDay = true;

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
  dayNightSubscription: Subscription;

  constructor(
    private weatherService: WeatherService,
    private store: Store<WeatherState>
  ) {
    // subscribe to the continuous weather fetching Observable
    this.weatherSubscription = this.weatherService
      .fetchWeather('onecall')
      .subscribe(response => this.populateWeather(response));

    // subscribe to the day/night status in the mode state slice
    this.dayNightSubscription = store
      .select(state => state)
      .subscribe(response => {
        this.isDay = response.modeReducer.isDaytime;
        document.body.className = this.isDay ? 'daytime-bg' : 'nighttime-bg';
        console.log('[AppComponent] isDay? ', this.isDay);
      });
  }

  ngOnInit() {}

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
