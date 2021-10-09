import { Component, Input, OnInit } from '@angular/core';
import { WeatherCondition } from '../../types/WeatherCondition';

@Component({
  selector: 'app-conditions',
  templateUrl: './conditions.component.html',
  styleUrls: ['./conditions.component.sass']
})
export class ConditionsComponent implements OnInit {
  @Input() conditions: WeatherCondition[] = [];

  constructor() {}

  ngOnInit(): void {}
}
