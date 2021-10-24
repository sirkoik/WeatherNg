import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY, of } from 'rxjs';
import {
  catchError,
  concatMap,
  concatMapTo,
  map,
  mergeMap,
  tap,
  withLatestFrom
} from 'rxjs/operators';
import { WeatherState } from '../app.module';
import { WeatherService } from '../services/weather.service';

@Injectable()
export class LocationEffects {
  getLocation$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Location] Get user location'),
      tap(() =>
        console.log('[LocationEffects] Registering Get User Location effect.')
      ),
      mergeMap(() =>
        this.weatherService.getUserLocation().pipe(
          tap(() => {
            console.log('[Location] No error!');
          }),
          // map(location => ({
          //   type: '[Location] Location retrieval success',
          //   payload: location
          // })),

          // dispatch actions to retrieve detailed location.
          concatMap(location => [
            {
              type: '[Location] Location retrieval success',
              payload: location
            },
            {
              type: '[Location] Retrieve detailed location'
            }
            // {
            //   type: '[Location] Retrieve weather data'
            // }
          ]),
          // TODO add another action to the stream here.
          catchError((error: GeolocationPositionError) =>
            of({
              type: '[Location] Location retrieval failure',
              payload: error
            })
          )
        )
      )
    )
  );

  // This effect is triggered when getLocation$ successfully retrieves coordinates.
  // It is not necessary to the functioning of the app or retrieval of weather data -
  // it just retrieves the city name.
  getDetailedLocation$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Location] Retrieve detailed location'),
      withLatestFrom(this.store.select(state => state.locationReducer.coords)),
      mergeMap(([obs, coords]) =>
        this.weatherService
          .fetchDetailedLocation(coords.latitude, coords.longitude)
          .pipe(
            map(detailedLocation => ({
              type: '[Location] Detailed location retrieval success',
              payload: detailedLocation
            })),
            catchError(error =>
              of({
                type: '[Location] Retrieve detailed location error',
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
