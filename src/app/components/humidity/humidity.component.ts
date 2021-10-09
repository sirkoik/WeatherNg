import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-humidity',
  templateUrl: './humidity.component.html',
  styleUrls: ['./humidity.component.sass']
})
export class HumidityComponent implements OnInit {
  @Input() humidity: number = 0;

  constructor() {}

  ngOnInit(): void {}
}
