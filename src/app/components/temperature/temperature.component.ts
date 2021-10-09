import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.sass']
})
export class TemperatureComponent implements OnInit {
  @Input() temperature: number = 0;
  @Input() temperatureFeels: number = 0;

  constructor() {}

  ngOnInit(): void {}
}
