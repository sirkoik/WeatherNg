import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { WeatherState } from 'src/app/app.module';
import { toggle } from 'src/app/store/units.actions';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})
export class MenuComponent implements OnInit {
  @Output() showCreditsEvent = new EventEmitter<boolean>();
  unitsToggleTo$: Observable<string>;

  showTheCredits = false;
  showMenu = false;

  constructor(private store: Store<WeatherState>) {
    this.unitsToggleTo$ = store.select(state => state.unitsReducer.toggleTo);
  }

  ngOnInit(): void {}

  toggleMetric(): void {
    this.store.dispatch(toggle());
  }

  toggleCredits(): void {
    this.showTheCredits = !this.showTheCredits;
    this.showCreditsEvent.emit(this.showTheCredits);
  }
}
