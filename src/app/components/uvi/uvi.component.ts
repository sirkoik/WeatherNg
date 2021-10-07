import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';

@Component({
  selector: 'app-uvi',
  templateUrl: './uvi.component.html',
  styleUrls: ['./uvi.component.sass']
})
export class UviComponent implements OnInit, OnChanges {
  @Input() level: number = 0;
  colorClass = 'uvi-green';

  constructor() {}

  ngOnInit(): void {
    this.colorClass = this.getColorclass();
  }

  // Change the colorClass every time the UV level changes
  // from outside data.
  // This only runs if the changes are made in the parent
  // component, which is the behavior we want in this case.
  ngOnChanges(changes: SimpleChanges): void {
    let change = changes['level'];

    if (!change.firstChange) {
      this.colorClass = this.getColorclass();
    }
  }

  getColorclass(): string {
    if (this.level < 3) return 'uvi-green';
    if (this.level < 6) return 'uvi-yellow';
    if (this.level < 8) return 'uvi-orange';
    if (this.level < 11) return 'uvi-red';
    return 'uvi-purple';
  }
}
