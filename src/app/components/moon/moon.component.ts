import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-moon',
  templateUrl: './moon.component.html',
  styleUrls: ['./moon.component.sass']
})
export class MoonComponent implements OnInit {
  phase = 0;
  constructor() {}

  ngOnInit(): void {
    this.phase = this.getPhase();
  }

  // code adapted from Jason Sturges
  // https://jasonsturges.medium.com/moons-lunar-phase-in-javascript-a5219acbfe6e
  // TODO this appears to be slightly inaccurate.
  getPhase(): number {
    const getJulianDate = (date: Date = new Date()): number => {
      const t = date.getTime();
      const offset = date.getTimezoneOffset();

      return t / 86400000 - offset / 1440 + 2440587.5;
    };

    const LUNAR_MONTH = 29.530588853;

    const lunarPct = (getJulianDate() - 2451550.1) / LUNAR_MONTH;

    let lunarPctNormalized = lunarPct - Math.floor(lunarPct);
    if (lunarPctNormalized < 0) lunarPctNormalized += 1;

    console.log(lunarPctNormalized);
    console.log(lunarPctNormalized * LUNAR_MONTH);

    return lunarPctNormalized;
  }
}
