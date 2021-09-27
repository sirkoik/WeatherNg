import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';

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
          this.temperature = response.current.temp;
          this.clouds = response.current.clouds;
        });
    });
  }
}
