import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
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
          map(location => ({
            type: '[Location] Location retrieval success',
            payload: location
          })),
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

  constructor(
    private actions$: Actions,
    private weatherService: WeatherService
  ) {}
}
