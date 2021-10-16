import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { WeatherState } from 'src/app/app.module';

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.sass']
})
export class TemperatureComponent implements OnInit {
  @Input() temperature: number = 0;
  @Input() temperatureFeels: number = 0;
  unitsSubscription: Subscription;

  tempConvertTo = 'c';

  temperatureDiff = Math.abs(this.temperature - this.temperatureFeels);

  constructor(private store: Store<WeatherState>) {
    console.log(
      '[Temperature] temperatureDiff between temp and feels',
      this.temperatureDiff
    );

    this.unitsSubscription = store
      .select(state => state)
      .subscribe(response => {
        this.tempConvertTo =
          response.unitsReducer.units === 'metric' ? 'c' : 'f';
        console.log('[Temperature] tempConvertTo', this.tempConvertTo);
      });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.unitsSubscription.unsubscribe();
  }
}
