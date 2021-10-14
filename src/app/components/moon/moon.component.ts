import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-moon',
  templateUrl: './moon.component.html',
  styleUrls: ['./moon.component.sass']
})
export class MoonComponent implements OnInit {
  moon: { phase: string; illumination: number } = {
    phase: '',
    illumination: 0
  };
  constructor() {}

  ngOnInit(): void {
    this.moon = this.getPhase();
  }

  // code adapted from Jason Sturges
  // https://jasonsturges.medium.com/moons-lunar-phase-in-javascript-a5219acbfe6e
  // added adjustment factor based on
  // https://stardate.org/nightsky/moon
  // TODO moon phase is still somewhat inaccurate.
  getPhase(): { phase: string; illumination: number } {
    const getJulianDate = (date: Date = new Date()): number => {
      const t = date.getTime();
      const offset = date.getTimezoneOffset();

      return t / 86400000 - offset / 1440 + 2440587.5;
    };

    const LUNAR_MONTH = 29.530588853;

    const lunarPct = (getJulianDate() - 2451550.1) / LUNAR_MONTH;

    let lunarPctNormalized = lunarPct - Math.floor(lunarPct);
    if (lunarPctNormalized < 0) lunarPctNormalized += 1;

    const pctLunation = (1.1 + lunarPctNormalized * LUNAR_MONTH) / LUNAR_MONTH;
    const pctIllumination =
      pctLunation < 1 ? 2 * pctLunation : 2 * (1 - pctLunation);

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

    return { phase: phase, illumination: 100 * pctIllumination };
  }
}
