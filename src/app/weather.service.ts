import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, interval, timer } from 'rxjs';
import { ObserveOnOperator } from 'rxjs/internal/operators/observeOn';
import { tap, catchError, mergeMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DefaultGeolocationPosition } from './default-geolocation-position';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  latitude = 45;
  longitude = 20;
  place = 'London';

  public isDayTime = false;

  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
    // 'Access-Control-Allow-Origin': '*'
  });

  constructor(private http: HttpClient) {}

  // made getLoc an observable. This can be chained to the fetchWeather observable more easily.
  // based partially on https://angular.io/guide/observables
  // TODO chain the getLoc and fetchWeather Observables more efficiently. When the user changes location
  // TODO from block to allow, possibly populate the new location in.
  getLoc(): Observable<GeolocationPosition | DefaultGeolocationPosition> {
    return new Observable(observer => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          position => observer.next(position),
          positionError => {
            observer.next(this.fillDefault());
            observer.error(positionError);
          },
          {
            enableHighAccuracy: true
          }
        );
      } else {
        observer.next(this.fillDefault());
        observer.error('Positioning unavailable.');
      }
    });
  }

  // fillDefault: fill the position with a default value if it's not available.

  fillDefault(): DefaultGeolocationPosition {
    return {
      coords: {
        latitude: this.latitude,
        longitude: this.longitude
      }
    };
  }

  // fetchWeather
  // fetches weather data for a given lat and long from the OpenWeatherMap server.
  // return Observable that can be setup to watch for http request.
  fetchWeather(
    type: string,
    latitude: number,
    longitude: number
  ): Observable<any> {
    // set up the parameters required by the OpenWeatherMap API.
    // The onecall API currently supports LAT and LONG parameters.
    const httpParams = new HttpParams().appendAll({
      lat: latitude,
      lon: longitude,
      appid: environment.openWeatherMap.key
    });

    const httpObs = this.http
      .get<any>(environment.openWeatherMap.endpointURL + '/' + type, {
        params: httpParams
      })
      .pipe(
        tap(response => {
          this.updateDayTime(response.current.sunrise, response.current.sunset);
          console.log(response);
        }),
        catchError((error, caught) => {
          console.log('error');
          return of([]);
        })
      );

    return timer(0, environment.refreshInterval).pipe(mergeMap(() => httpObs));
    // return this.getLoc().pipe(
    //   mergeMap(() =>
    //     timer(0, environment.refreshInterval).pipe(mergeMap(() => httpObs))
    //   )
    // );
  }

  updateDayTime(startTs: number, endTs: number) {
    const ts = new Date().getTime();
    this.isDayTime = ts >= startTs && ts < endTs;
  }
}
