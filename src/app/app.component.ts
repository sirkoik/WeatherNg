import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, ObservableInput, Subscription } from 'rxjs';
import { WeatherState } from './app.module';
import { WeatherService } from './services/weather.service';
import { getUserLocation } from './store/location.actions';
import { hideAbout, setLoading } from './store/mode.actions';
import { fetchWeather } from './store/weather.actions';
import { WeatherData } from './types/WeatherData';
import { WeatherLocation } from './types/WeatherLocation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, OnDestroy {
  loading = true;
  isDay = true;
  showAbout = false;

  // empty WeatherData object that is populated in the fetchWeater response.
  // weatherData: WeatherData = {
  //   cityName: 'London (default)',
  //   temperature: 0,
  //   temperatureFeels: 0,
  //   cloudCover: 0,
  //   humidity: 0,
  //   sun: {
  //     sunrise: 0,
  //     sunset: 0
  //   },
  //   uvi: 0,
  //   wind: {
  //     speed: 0,
  //     direction: 0
  //   },
  //   weatherConditions: []
  // };

  // subscribe to the weather http call Observable
  // weatherSubscription: Subscription;
  dayNightSubscription: Subscription;
  loadingSubscription: Subscription;

  showAbout$: Observable<boolean>;
  location$: Observable<WeatherLocation> = this.store.select(
    state => state.locationReducer
  );
  geolocationPositionError$: Observable<GeolocationPositionError | null> =
    this.store.select(state => state.locationReducer.error);

  weather$: Observable<WeatherData> = this.store.select(
    state => state.weatherReducer
  );

  constructor(
    private weatherService: WeatherService,
    private store: Store<WeatherState>
  ) {
    store.dispatch(setLoading({ isLoading: true }));

    // subscribe to the continuous weather fetching Observable
    // this.weatherSubscription = this.weatherService
    //   .fetchWeather('onecall')
    //   .subscribe(response => this.populateWeather(response));

    // subscribe to the day/night status in the mode state slice
    this.dayNightSubscription = store
      .select(state => state.modeReducer.isDaytime)
      .subscribe(isDayTime => {
        this.isDay = isDayTime;
        document.body.className = this.isDay ? 'daytime-bg' : 'nighttime-bg';
        console.log('[AppComponent] isDay? ', this.isDay);
      });

    this.loadingSubscription = store
      .select(state => state.modeReducer.isLoading)
      .subscribe(isLoading => {
        this.loading = isLoading;
      });

    this.showAbout$ = store.select(state => state.modeReducer.showAbout);
  }

  ngOnInit() {
    // dispatch the action for retrieving user location in the store.
    this.store.dispatch(getUserLocation());
    this.location$.subscribe(() => {
      console.log('[AppComponent] Fetching Weather');
      this.store.dispatch(fetchWeather());
      this.store.dispatch(setLoading({ isLoading: false }));
    });
  }

  ngOnDestroy() {
    // this.weatherSubscription.unsubscribe();
    this.dayNightSubscription.unsubscribe();
  }

  // populateWeather: update the GUI with weather data
  // retrieved from the server.
  // populateWeather(responses: any) {
  //   console.log('AppComponent: populateWeather', responses);

  //   // locationIQ API
  //   this.weatherData.cityName = responses[0].address.city;

  //   // OpenWeatherMap one call API
  //   const cur = responses[1].current;

  //   this.weatherData.temperature = cur.temp;
  //   this.weatherData.temperatureFeels = cur.feels_like;
  //   this.weatherData.cloudCover = cur.clouds;
  //   this.weatherData.humidity = cur.humidity;

  //   this.weatherData.sun = {
  //     sunrise: cur.sunrise * 1000,
  //     sunset: cur.sunset * 1000
  //   };

  //   this.weatherData.weatherConditions = cur.weather;
  //   this.weatherData.wind = {
  //     speed: cur.wind_speed,
  //     direction: cur.wind_deg
  //   };
  //   if (cur.wind_gust) this.weatherData.wind.gust = cur.wind_gust;
  //   this.weatherData.uvi = cur.uvi;

  //   this.store.dispatch(setLoading({ isLoading: false }));
  // }

  hideAboutBox() {
    this.store.dispatch(hideAbout());
  }
}
