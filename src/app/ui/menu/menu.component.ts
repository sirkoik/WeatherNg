import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { WeatherState } from 'src/app/app.module';
import { showAbout } from 'src/app/store/mode.actions';
import { toggle } from 'src/app/store/units.actions';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})
export class MenuComponent implements OnInit {
  @Output() showCreditsEvent = new EventEmitter<boolean>();
  unitsToggleTo$: Observable<string>;

  showMenu = false;

  constructor(private store: Store<WeatherState>) {
    this.unitsToggleTo$ = store.select(state => state.unitsReducer.toggleTo);
  }

  ngOnInit(): void {}

  toggleMetric(): void {
    this.store.dispatch(toggle());
  }

  showAboutBox(): void {
    this.store.dispatch(showAbout());
  }
}
