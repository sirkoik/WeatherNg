import { Component, Input, OnInit } from '@angular/core';
import { Wind } from 'src/app/types/Wind';

@Component({
  selector: 'app-wind',
  templateUrl: './wind.component.html',
  styleUrls: ['./wind.component.sass']
})
export class WindComponent implements OnInit {
  @Input() wind: Wind = {
    speed: 0,
    direction: 0
  };

  constructor() {}

  ngOnInit(): void {}
}
