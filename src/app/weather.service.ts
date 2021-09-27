import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  latitude = 45;
  longitude = 20;
  place = 'London';

  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
    // 'Access-Control-Allow-Origin': '*'
  });

  constructor(private http: HttpClient) {}

  // try to autodetect location, and handle user decline or other error.
  // TODO make this work with the Observable in fetchWeather.
  getUserLocation() {
    const getCoords = new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        position => resolve(position),
        positionError => reject(positionError),
        {
          enableHighAccuracy: true
        }
      );
    })
      .then(position => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;

        this.place = '';

        this.fetchWeather('onecall', this.latitude, this.longitude).subscribe(
          response => console.log(response)
        );
      })
      .catch(error => {
        const errorType = Object.prototype.toString.apply(error);
        if (
          errorType === '[object GeolocationPositionError]' &&
          error.code === 1
        ) {
          alert(
            'It looks like you declined to share your location. Nothing wrong with that - who likes to be tracked?' +
              '\n\nTo use the weather app, you can enter your location manually. If you enter your city name or zip code, the location data will be vague enough to protect your privacy but still relevant enough to provide weather information.' +
              '\n\nOr, you could type in a different location to get weather for another place.'
          );
          //showLocPopup(true);
        } else {
          alert('General error: ' + error.message);
        }
      });
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

    return this.http
      .get<any>(environment.openWeatherMap.endpointURL + '/' + type, {
        params: httpParams
      })
      .pipe(
        catchError((error, caught) => {
          console.log('error');
          return of([]);
        })
      );
  }
}
