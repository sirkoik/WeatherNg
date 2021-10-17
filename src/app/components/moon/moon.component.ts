import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-moon',
  templateUrl: './moon.component.html',
  styleUrls: ['./moon.component.sass']
})
export class MoonComponent implements OnInit {
  phase: string = '';

  // phases = [
  //   {
  //     name: 'New Moon',
  //     ageMin: 0,
  //     ageMax: 1,
  //     illumMin: 0,
  //     illumMax: 0.1
  //   },
  //   {
  //     name: 'Waxing Crescent',
  //     ageMin: 1,
  //     ageMax: 7,
  //     illumMin: 0.1,
  //     illumMax: 50
  //   },
  //   {
  //     name: 'First quarter',
  //     ageMin: 7,
  //     ageMax: 8,
  //     illumMin: 50,
  //     illumMax: 50.1
  //   },
  //   {
  //     name: 'Waxing Gibbous',
  //     ageMin: 8,
  //     AgeMax: 14,
  //     illumMin: 50.1,
  //     illumMax: 99
  //   },
  //   {
  //     name: 'Full',
  //     ageMin: 14,
  //     ageMax: 16,
  //     illumMin: 99,
  //     illumMax: 100
  //   },
  //   {
  //     name: 'Waning Gibbous',
  //     ageMin: 16,
  //     ageMax: 21.765,
  //     illumMin: 50.1,
  //     illumMax: 99
  //   },
  //   {
  //     name: 'Third Quarter',
  //     ageMin: 21.765,
  //     ageMax: 22.765,
  //     illumMin: 50,
  //     illumMax: 50.1
  //   },
  //   {
  //     name: 'Waning Crescent',
  //     ageMin: 22.765,
  //     ageMax: 28.53,
  //     illumMin: 0.1,
  //     illumMax: 50
  //   }
  // ];

  // phase = this.phases[0];

  constructor() {}

  ngOnInit(): void {
    this.phase = this.getPhase();
  }

  // code adapted from Jason Sturges
  // https://jasonsturges.medium.com/moons-lunar-phase-in-javascript-a5219acbfe6e
  // Moon phase is relatively easy to get based on date and timezone offset.
  // Percent illumination is somewhat more difficult because it needs to be an
  // accurate number.
  getPhase(): string {
    const getJulianDate = (date: Date = new Date()): number => {
      const t = date.getTime();
      const offset = date.getTimezoneOffset();

      return t / 86400000 - offset / 1440 + 2440587.5;
    };

    const LUNAR_MONTH = 29.530588853;

    const lunarPct = (getJulianDate() - 2451550.1) / LUNAR_MONTH;

    let lunarPctNormalized = lunarPct - Math.floor(lunarPct);
    if (lunarPctNormalized < 0) lunarPctNormalized += 1;

    const pctLunation = (lunarPctNormalized * LUNAR_MONTH) / LUNAR_MONTH;
    //const pctIllumination = Math.sin(Math.PI * pctLunation);

    let phase = 'new moon';
    if (pctLunation > 0) phase = 'new moon';
    if (pctLunation > 0.05) phase = 'waxing crescent';
    if (pctLunation > 0.2) phase = 'first quarter';
    if (pctLunation > 0.3) phase = 'waxing gibbous';
    if (pctLunation > 0.48) phase = 'full';
    if (pctLunation > 0.52) phase = 'waning gibbous';
    if (pctLunation > 0.7) phase = 'last quarter';
    if (pctLunation > 0.8) phase = 'waning crescent';
    if (pctLunation > 0.95) phase = 'new moon';

    return phase;
  }
}
