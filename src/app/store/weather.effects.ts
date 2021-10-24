import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { WeatherState } from '../app.module';
import { WeatherService } from '../services/weather.service';

@Injectable()
export class WeatherEffects {
  getWeather$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Weather] Fetch weather'),
      withLatestFrom(this.store.select(state => state.locationReducer.coords)),
      mergeMap(([obs, coords]) =>
        this.weatherService
          .fetchWeatherFromServer('onecall', coords.latitude, coords.longitude)
          .pipe(
            map(weatherData => ({
              type: '[Weather] Load weather',
              weatherData: weatherData
            })),
            catchError(error =>
              of({
                type: '[Weather] Load weather failed',
                payload: error
              })
            )
          )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private weatherService: WeatherService,
    private store: Store<WeatherState>
  ) {}
}
