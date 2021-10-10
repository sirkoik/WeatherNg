import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sun',
  templateUrl: './sun.component.html',
  styleUrls: ['./sun.component.sass']
})
export class SunComponent implements OnInit {
  @Input() sun: any;

  dayStart = 0;
  dayEnd = 0;

  dayPct = 0;
  nightPct = 0;

  constructor() {}

  ngOnInit(): void {
    this.dayStart = this.sun.sunrise - (this.sun.sunrise % 8.64e7);
    this.dayEnd = this.dayStart + 8.64e7;
    this.dayPct =
      (100 * (this.sun.sunset - this.sun.sunrise)) /
      (this.dayEnd - this.dayStart);
    this.nightPct = 100 - this.dayPct;
  }

  tsToDate(ts: number): Date {
    return new Date(ts);
  }
}
