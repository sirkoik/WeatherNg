import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { forkJoin, Observable, of, timer } from 'rxjs';
import { tap, catchError, switchMap, concatMapTo } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { DefaultGeolocationPosition } from '../types/default-geolocation-position';
import { RefreshIndicatorService } from './refresh-indicator.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  isMetric = true;
  isDaytime = true;
  initialRun = true;
  updateDayNight: EventEmitter<boolean> = new EventEmitter();

  latitude = 45;
  longitude = 20;
  place = 'London';

  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(
    private http: HttpClient,
    private refreshIndicatorService: RefreshIndicatorService
  ) {}

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
  // call getUserLocation, then fetch detailed location data and weather data from the
  // LocationIQ and OpenWeatherMap APIs, respectively.
  // @return Observable that can be subscribed to (load data after the HTTP request completes).
  // Runs on a timer based on environment.refreshInterval
  fetchWeather(type: string): Observable<any> {
    // return the getUserLocation() observable, piped to a switchMap
    // that joins two HttpClient.get() observables and returns a
    // timer observable that is mapped to those two observables

    return this.getUserLocation().pipe(
      switchMap(location => {
        const detailedLocationObservable = this.fetchDetailedLocation(
          location.coords.latitude,
          location.coords.longitude
        );

        const weatherDataObservable = this.fetchWeatherFromServer(
          type,
          location.coords.latitude,
          location.coords.longitude
        );

        // Wait for the two HttpClient.get observables to complete, then
        // pass the results into a new observable which outputs data from
        // both observables.
        const obs = forkJoin([
          detailedLocationObservable,
          weatherDataObservable
        ]);

        // Create a timer observable to periodically refresh. Map to the
        // joined HttpClient.get observables.
        return timer(0, environment.refreshInterval).pipe(
          concatMapTo(obs),
          tap(() => {
            if (this.initialRun) {
              this.refreshIndicatorService.subscribeToRefresh();
            }
            this.initialRun = false;
          })
        );
      })
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
          // update day/night by emitting event that the app component listens to.
          const isDaytime = this.getIsDaytime(
            response.current.sunrise,
            response.current.sunset
          );

          if (this.initialRun || isDaytime != this.isDaytime) {
            this.isDaytime = isDaytime;
            this.updateDayNight.next(isDaytime);
          }

          console.log('OpenWeatherMap response', response);
        }),
        catchError((error, caught) => {
          console.log('error with OpenWeatherMap');
          return of([]);
        })
      );
  }

  // fetchDetailedLocation: Get detailed location data for a given latitude and longitude.
  fetchDetailedLocation(latitude: number, longitude: number) {
    const httpParams = new HttpParams().appendAll({
      lat: latitude,
      lon: longitude,
      key: environment.locationIq.key,
      format: 'json'
    });

    return this.http
      .get<any>(environment.locationIq.endpointURL + '/reverse.php', {
        params: httpParams
      })
      .pipe(
        tap(response => {
          console.log('locationIq response', response);
        }),
        catchError((error, caught) => {
          console.log('error with locationIQ');
          // TODO return generic / error city information if locationIQ endpoint doesn't work.
          return of([]);
        })
      );
  }

  // get is day/night
  // TODO change to an interval format
  getIsDaytime(sunriseTsSec: number, sunsetTsSec: number) {
    const tsSec = new Date().getTime() / 1000;
    return tsSec >= sunriseTsSec && tsSec < sunsetTsSec;
  }
}
