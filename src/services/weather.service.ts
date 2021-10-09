import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, timer } from 'rxjs';
import { tap, catchError, mergeMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DefaultGeolocationPosition } from '../app/types/default-geolocation-position';

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

  // getUserLocation: Fetch the user location and pass it along to the next Observable.
  // If the user declines to share their location, supply a default location (London).
  // based partially on https://angular.io/guide/observables
  getUserLocation(): Observable<
    GeolocationPosition | DefaultGeolocationPosition
  > {
    return new Observable(observer => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          position => observer.next(position),
          positionError => {
            observer.next(this.fillDefault());
            // don't error out
            // observer.error(positionError);
          },
          {
            enableHighAccuracy: true
          }
        );
      } else {
        observer.next(this.fillDefault());
        //observer.error('Positioning unavailable.');
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
  // call getUserLocation, and then fetches weather data for that given location
  // from the OpenWeatherMap server.
  // @return Observable that can be subscribed to (load data after the HTTP request completes).
  // Runs on a timer based on environment.refreshInterval
  fetchWeather(type: string): Observable<any> {
    return this.getUserLocation().pipe(
      mergeMap(location =>
        timer(0, environment.refreshInterval).pipe(
          mergeMap(() => {
            return this.fetchWeatherFromServer(
              type,
              location.coords.latitude,
              location.coords.longitude
            );
          })
        )
      )
    );
  }

  // fetchWeatherFromServer
  // Retrieves weather data from the OpenWeatherMap server.
  // Passes the result to the next Observable (likely this is last part that
  // the user subscribes to)
  fetchWeatherFromServer(type: string, latitude: number, longitude: number) {
    // set up the parameters required by the OpenWeatherMap API.
    // The onecall API currently supports LAT and LONG parameters.
    const httpParams = new HttpParams().appendAll({
      lat: latitude,
      lon: longitude,
      appid: environment.openWeatherMap.key
    });

    return this.http
      .get<any>(environment.openWeatherMap.endpointURL + '/' + type, {
        params: httpParams
      })
      .pipe(
        tap(response => {
          this.updateDayTime(response.current.sunrise, response.current.sunset);

          //TODO move this elsewhere
          document.body.className = this.isDayTime
            ? 'daytime-bg'
            : 'nighttime-bg';
          console.log(response);
        }),
        catchError((error, caught) => {
          console.log('error');
          return of([]);
        })
      );
  }

  updateDayTime(startTs: number, endTs: number) {
    const ts = new Date().getTime();
    this.isDayTime = ts >= startTs && ts < endTs;
  }
}
