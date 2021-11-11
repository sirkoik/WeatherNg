import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-compass',
  templateUrl: './compass.component.html',
  styleUrls: ['./compass.component.sass']
})
export class CompassComponent implements OnInit {
  @Input() angle: number = 0;

  ImagePath = '/assets/compass-needle.svg';

  constructor() {}

  ngOnInit(): void {}
}
