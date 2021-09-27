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

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.weatherService
      .fetchWeather('onecall', 51.5, 0.128)
      .subscribe(response => {
        this.temperature = response.current.temp;
      });
  }
}
