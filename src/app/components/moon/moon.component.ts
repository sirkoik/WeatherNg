import { Component, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';

type MoonPhase = {
  name: string;
  iconN: string;
  iconS: string;
  ageMin: number;
  ageMax: number;
  illumMin: number;
  illumMax: number;
};

@Component({
  selector: 'app-moon',
  templateUrl: './moon.component.html',
  styleUrls: ['./moon.component.sass']
})
export class MoonComponent implements OnInit {
  phaseSubscription: Subscription;

  // lunar phases.
  // TODO choose iconN or iconS based on whether user is in Northern or Southern hemisphere.
  phases: MoonPhase[] = [
    {
      name: 'New Moon',
      iconN: '🌚',
      iconS: '🌚',
      ageMin: 0,
      ageMax: 1,
      illumMin: 0,
      illumMax: 0.1
    },
    {
      name: 'Waxing Crescent',
      iconN: '🌒',
      iconS: '🌘',
      ageMin: 1,
      ageMax: 7,
      illumMin: 0.1,
      illumMax: 50
    },
    {
      name: 'First quarter',
      iconN: '🌓',
      iconS: '🌗',
      ageMin: 7,
      ageMax: 8,
      illumMin: 50,
      illumMax: 50.1
    },
    {
      name: 'Waxing Gibbous',
      iconN: '🌔',
      iconS: '🌖',
      ageMin: 8,
      ageMax: 14,
      illumMin: 50.1,
      illumMax: 99
    },
    {
      name: 'Full',
      iconN: '🌝',
      iconS: '🌝',
      ageMin: 14,
      ageMax: 16,
      illumMin: 99,
      illumMax: 100
    },
    {
      name: 'Waning Gibbous',
      iconN: '🌖',
      iconS: '🌔',
      ageMin: 16,
      ageMax: 21.765,
      illumMin: 50.1,
      illumMax: 99
    },
    {
      name: 'Third Quarter',
      iconN: '🌗',
      iconS: '🌓',
      ageMin: 21.765,
      ageMax: 22.765,
      illumMin: 50,
      illumMax: 50.1
    },
    {
      name: 'Waning Crescent',
      iconN: '🌘',
      iconS: '🌒',
      ageMin: 22.765,
      ageMax: 28.53,
      illumMin: 0.1,
      illumMax: 50
    }
  ];

  phase = this.phases[0];

  constructor() {
    // check the moon phase every five seconds, update if changed
    this.phaseSubscription = timer(0, 5000).subscribe(() => {
      const newPhase = this.getPhase();
      if (newPhase !== this.phase) this.phase = newPhase;
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.phaseSubscription.unsubscribe();
  }

  // code adapted from Jason Sturges
  // https://jasonsturges.medium.com/moons-lunar-phase-in-javascript-a5219acbfe6e
  // Moon phase is relatively easy to get based on date and timezone offset.
  // Percent illumination is somewhat more difficult because it needs to be an
  // accurate number.
  getPhase(): MoonPhase {
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

    let phase = this.phases[0];
    if (pctLunation > 0) phase = this.phases[0];
    if (pctLunation > 0.05) phase = this.phases[1];
    if (pctLunation > 0.2) phase = this.phases[2];
    if (pctLunation > 0.3) phase = this.phases[3];
    if (pctLunation > 0.48) phase = this.phases[4];
    if (pctLunation > 0.52) phase = this.phases[5];
    if (pctLunation > 0.7) phase = this.phases[6];
    if (pctLunation > 0.8) phase = this.phases[7];
    if (pctLunation > 0.95) phase = this.phases[8];

    return phase;
  }
}
