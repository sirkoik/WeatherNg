import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})
export class MenuComponent implements OnInit {
  @Output() showCreditsEvent = new EventEmitter<boolean>();

  showTheCredits = false;
  showMenu = false;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {}

  showCredits(): void {
    this.showTheCredits = !this.showTheCredits;
    this.showCreditsEvent.emit(this.showTheCredits);
  }

  toggleMetric(): void {
    this.weatherService.isMetric = !this.weatherService.isMetric;
  }
}
