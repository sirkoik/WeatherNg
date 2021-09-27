import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';
import { WeatherCondition } from './WeatherCondition';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'Weather, Angular edition';

  url = '';
  temperature = 0;
  clouds = 0;
  weatherConditions: WeatherCondition[] = [];
  wind = {
    speed: 0,
    direction: ''
  };

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.weatherService.getLoc().subscribe(response => {
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
}
