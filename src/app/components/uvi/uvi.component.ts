import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';

// TODO better typing on UviLevel
type UviLevel = {
  colorClass: string;
  title: string;
};

@Component({
  selector: 'app-uvi',
  templateUrl: './uvi.component.html',
  styleUrls: ['./uvi.component.sass']
})
export class UviComponent implements OnInit, OnChanges {
  @Input() level: number = 0;
  uviLevels = {
    'uvi-0-2': {
      colorClass: 'uvi-green',
      title: 'low'
    },
    'uvi-3-5': {
      colorClass: 'uvi-yellow',
      title: 'moderate'
    },
    'uvi-6-7': {
      colorClass: 'uvi-orange',
      title: 'high'
    },
    'uvi-8-10': {
      colorClass: 'uvi-red',
      title: 'very high'
    },
    'uvi-11+': {
      colorClass: 'uvi-purple',
      title: 'extreme'
    }
  };

  uviLevel = this.uviLevels['uvi-0-2'];

  constructor() {}

  ngOnInit(): void {
    this.uviLevel = this.getUviLevel();
  }

  // Change the colorClass every time the UV level changes
  // from outside data.
  // This only runs if the changes are made in the parent
  // component, which is the behavior we want in this case.
  ngOnChanges(changes: SimpleChanges): void {
    let change = changes['level'];

    if (!change.firstChange) {
      this.uviLevel = this.getUviLevel();
    }
  }

  getUviLevel(): UviLevel {
    if (this.level < 3) return this.uviLevels['uvi-0-2'];
    if (this.level < 6) return this.uviLevels['uvi-3-5'];
    if (this.level < 8) return this.uviLevels['uvi-6-7'];
    if (this.level < 11) return this.uviLevels['uvi-8-10'];
    return this.uviLevels['uvi-11+'];
  }
}
