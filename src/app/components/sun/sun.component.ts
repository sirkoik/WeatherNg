import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Sun } from 'src/app/types/Sun';

@Component({
  selector: 'app-sun',
  templateUrl: './sun.component.html',
  styleUrls: ['./sun.component.sass']
})
export class SunComponent implements OnInit {
  @Input() sun: Sun;

  dayStart = 0;
  dayEnd = 0;

  dayPct = 0;
  nightPct = 0;

  tilSunrise = 0;
  tilSunset = 0;
  sinceSunrise = 0;
  sinceSunset = 0;

  constructor() {
    this.sun = {
      sunrise: 0,
      sunset: 0
    };
  }

  ngOnInit(): void {
    this.updateSunCalculations();

    // update "time til / since" sunrise/sunset every five seconds.
    // this could be done with a setInterval, but an RxJS Observable
    // allows it to be started immediately with one statement.
    const sunObs = new Observable(observer => {
      const now = new Date().getTime();

      this.tilSunrise = this.sun.sunrise - now;
      this.tilSunset = this.sun.sunset - now;
      this.sinceSunrise = now - this.sun.sunrise;
      this.sinceSunset = now - this.sun.sunset;
    });

    timer(0, 5000)
      .pipe(switchMap(() => sunObs))
      .subscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateSunCalculations();
  }

  tsToDate(ts: number): Date {
    return new Date(ts);
  }

  updateSunCalculations(): void {
    console.log('[SunComponent] sun', this.sun);
    this.dayStart = this.sun.sunrise - (this.sun.sunrise % 8.64e7);
    this.dayEnd = this.dayStart + 8.64e7;
    this.dayPct =
      (100 * (this.sun.sunset - this.sun.sunrise)) /
      (this.dayEnd - this.dayStart);
    this.nightPct = 100 - this.dayPct;
  }
}
