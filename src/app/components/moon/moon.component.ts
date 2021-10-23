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
  illumination = 0;

  constructor() {
    // check the moon phase every five seconds, update if changed
    this.phaseSubscription = timer(0, 5000).subscribe(() => {
      const newPhase = this.getPhase();
      if (newPhase !== this.phase) this.phase = newPhase;

      this.illumination = this.getIllumination();
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.phaseSubscription.unsubscribe();
  }

  getJulianDate = (date: Date = new Date()): number => {
    const t = date.getTime();
    const offset = date.getTimezoneOffset();

    return t / 86400000 - offset / 1440 + 2440587.5;
  };

  // code adapted from Jason Sturges
  // https://jasonsturges.medium.com/moons-lunar-phase-in-javascript-a5219acbfe6e
  // Moon phase is relatively easy to get based on date and timezone offset.
  // Percent illumination is somewhat more difficult because it needs to be an
  // accurate number.
  getPhase(): MoonPhase {
    const LUNAR_MONTH = 29.530588853;

    const lunarPct = (this.getJulianDate() - 2451550.1) / LUNAR_MONTH;

    let lunarPctNormalized = lunarPct - Math.floor(lunarPct);
    if (lunarPctNormalized < 0) lunarPctNormalized += 1;

    const pctLunation = (lunarPctNormalized * LUNAR_MONTH) / LUNAR_MONTH;
    const age = lunarPctNormalized * LUNAR_MONTH;

    // console.log('age', age);

    return (
      this.phases.find(phase => {
        return phase.ageMin < age && age < phase.ageMax;
      }) || this.phases[0]
    );
  }

  // getIllumination: get the lunar illumination in percent.
  // This uses a "lower accuracy" algorithm from Chapter 48 in Astronomical Algorithms by Jean Meeus.
  // It seems to be off by a very slight amount, but not enough to really matter. I've added a +0.8
  // correction constant to the JDE, which may improve the accuracy slightly.
  getIllumination(): number {
    // give T at least 9 decimals.
    const JD = this.getJulianDate();
    const JDE = JD + 0.8; // JDE differs from JD by small quantity dT. Assuming a small error. JDE ~ JD. Astronomical Algorithms Chapter 10

    // T: number of centuries since J2000.0 (2000/01/01). About 0.2....
    const T = (JDE - 2451545) / 36525;

    // D: Mean elongation of the moon.
    const D =
      297.8501921 +
      445267.114034 * T -
      0.0018819 * Math.pow(T, 2) +
      Math.pow(T, 3) / 545868 -
      Math.pow(T, 4) / 113065000;

    //const DsmallDeg = D - 360 * Math.floor(D / 360);

    // M: Mean anomaly of the sun.
    const M =
      357.5291092 +
      35999.0502909 * T -
      0.0001536 * Math.pow(T, 2) +
      Math.pow(T, 3) / 24490000;

    //const MsmallDeg = M - 360 * Math.floor(M / 360);

    // M': Mean anomaly of the moon.
    const Mp =
      134.9633964 +
      477198.8675055 * T +
      0.0087414 * Math.pow(T, 2) +
      Math.pow(T, 3) / 69699 -
      Math.pow(T, 4) / 14712000;

    //const MpsmallDeg = Mp - 360 * Math.floor(Mp / 360);

    //console.log("T, D, M, M'", T, DsmallDeg, MsmallDeg, MpsmallDeg);

    const toRad = (deg: number): number => (deg * Math.PI) / 360;

    // this angle is given in degrees. Since math functions take radians,
    // the inputs must be converted to radians, but the overall result
    // is still in degrees.
    const phaseAngle =
      180 -
      D -
      6.289 * Math.sin(toRad(Mp)) +
      2.1 * Math.sin(toRad(M)) -
      1.274 * Math.sin(toRad(2 * D - Mp)) -
      0.658 * Math.sin(toRad(2 * D)) -
      0.214 * Math.sin(toRad(2 * Mp)) -
      0.11 * Math.sin(toRad(D));

    // k = (1 + cos(i)) / 2
    return (1 + Math.cos(toRad(phaseAngle))) / 2;
  }
}
