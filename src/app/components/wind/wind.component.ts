import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { WeatherState } from 'src/app/app.module';
import { Wind } from 'src/app/types/Wind';

@Component({
  selector: 'app-wind',
  templateUrl: './wind.component.html',
  styleUrls: ['./wind.component.sass']
})
export class WindComponent implements OnInit {
  unitsSubscription: Subscription;
  windUnits = 'km/h';

  @Input() wind: Wind = {
    speed: 0,
    direction: 0
  };

  constructor(private store: Store<WeatherState>) {
    this.unitsSubscription = store
      .select(state => state)
      .subscribe(response => {
        this.windUnits =
          response.unitsReducer.units === 'metric' ? 'km/h' : 'mph';
      });
  }

  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.unitsSubscription.unsubscribe();
  }
}
