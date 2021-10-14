import { Component, Input, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.sass']
})
export class TemperatureComponent implements OnInit {
  @Input() temperature: number = 0;
  @Input() temperatureFeels: number = 0;

  tempConvertTo = 'c';

  temperatureDiff = Math.abs(this.temperature - this.temperatureFeels);

  constructor(private weatherService: WeatherService) {
    //this.tempConvertTo = weatherService.isMetric ? 'c' : 'f';
  }

  ngOnInit(): void {}
}
