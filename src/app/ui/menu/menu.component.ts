import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from 'src/app/app.module';
import { WeatherService } from 'src/app/services/weather.service';
import { toggle } from 'src/app/store/units.actions';
import { UnitsState } from 'src/app/types/UnitsState';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})
export class MenuComponent implements OnInit {
  @Output() showCreditsEvent = new EventEmitter<boolean>();
  units$: Observable<string>;

  showTheCredits = false;
  showMenu = false;

  constructor(
    private weatherService: WeatherService,
    private store: Store<State>
  ) {
    this.units$ = store.select(state => state.unitsReducer.units);
    //this.units$ =
    // store
    //   .select(state => state)
    //   .subscribe(response => {
    //     this.units = response.unitsReducer.units;
    //   });

    // console.log(this.units$);
  }

  ngOnInit(): void {}

  showCredits(): void {
    this.showTheCredits = !this.showTheCredits;
    this.showCreditsEvent.emit(this.showTheCredits);
  }

  toggleMetric(): void {
    this.store.dispatch(toggle());
    this.weatherService.isMetric = !this.weatherService.isMetric;
  }
}
