import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-uvi',
  templateUrl: './uvi.component.html',
  styleUrls: ['./uvi.component.sass']
})
export class UviComponent implements OnInit {
  @Input() level: number = 0;
  colorClass = 'uvi-green';

  constructor() {}

  ngOnInit(): void {
    this.colorClass = this.getColorclass();
  }

  getColorclass(): string {
    if (this.level < 3) return 'uvi-green';
    if (this.level < 6) return 'uvi-yellow';
    if (this.level < 8) return 'uvi-orange';
    if (this.level < 11) return 'uvi-red';
    return 'uvi-purple';
  }
}
