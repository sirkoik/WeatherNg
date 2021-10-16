import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-clouds',
  templateUrl: './clouds.component.html',
  styleUrls: ['./clouds.component.sass']
})
export class CloudsComponent implements OnInit {
  @Input() clouds: number = 0;
  @Input() isDaytime: boolean = true;

  constructor() {}

  ngOnInit(): void {}
}
